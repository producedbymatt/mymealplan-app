import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import PhotoUploader from "./photos/PhotoUploader";
import PhotoGallery from "./photos/PhotoGallery";

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
    const validTypes = ['image/jpeg', 'image/png', 'image/heic'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      toast.error("Please upload a JPEG, PNG, or HEIC file");
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

      <PhotoUploader
        uploading={uploading}
        uploadProgress={uploadProgress}
        onFileUpload={handleFileUpload}
      />

      <PhotoGallery
        photos={photos}
        onDelete={handleDelete}
      />
    </Card>
  );
};

export default ProgressPhotos;