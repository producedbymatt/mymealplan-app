import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Photo {
  id: string;
  photo_url: string;
  created_at: string;
}

const ProgressPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      console.log('Loading progress photos...');
      const { data: photos, error } = await supabase
        .from('progress_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Loaded photos:', photos);
      setPhotos(photos || []);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error("Failed to load progress photos");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `progress-photos/${user.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, file, {
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-uploads')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('progress_photos')
        .insert([
          {
            user_id: user.id,
            photo_url: publicUrl,
          },
        ]);

      if (dbError) throw dbError;

      toast.success("Photo uploaded successfully");
      await loadPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error("Failed to upload photo");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (photoId: string, photoUrl: string) => {
    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('progress_photos')
        .delete()
        .eq('id', photoId);

      if (dbError) throw dbError;

      // Delete from storage
      const filePath = photoUrl.split('/').slice(-2).join('/');
      const { error: storageError } = await supabase.storage
        .from('user-uploads')
        .remove([`progress-photos/${filePath}`]);

      if (storageError) throw storageError;

      toast.success("Photo deleted successfully");
      await loadPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error("Failed to delete photo");
    }
  };

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-center">Progress Photos</h2>
      <p className="text-muted-foreground text-center mb-6">
        Upload photos to visually track your progress over time
      </p>

      <div className="mb-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center gap-2 p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  {uploading ? (
                    <>
                      <Upload className="w-6 h-6 animate-pulse" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-6 h-6" />
                      <span>Click to upload a photo</span>
                    </>
                  )}
                </label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Maximum file size: 5MB</p>
              <p>Supported formats: JPEG, PNG</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {uploading && (
          <Progress value={uploadProgress} className="mt-4" />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <img
              src={photo.photo_url}
              alt={`Progress photo from ${format(new Date(photo.created_at), 'PPP')}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              <p className="text-sm text-center">
                {format(new Date(photo.created_at), 'PPp')}
              </p>
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDelete(photo.id, photo.photo_url)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          No progress photos uploaded yet
        </div>
      )}
    </Card>
  );
};

export default ProgressPhotos;