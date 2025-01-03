import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import PhotoUploader from "./photos/PhotoUploader";
import PhotoGallery from "./photos/PhotoGallery";
import heic2any from "heic2any";

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
    const initializeSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        return;
      }
      if (session) {
        loadPhotos();
      }
    };

    initializeSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadPhotos();
      } else {
        setPhotos([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadPhotos = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('No active session found');
        return;
      }

      console.log('Loading progress photos...');
      const { data: photos, error } = await supabase
        .from('progress_photos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Loaded photos:', photos);
      setPhotos(photos || []);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error("Failed to load progress photos");
    }
  };

  const convertHeicToJpg = async (file: File): Promise<File> => {
    try {
      console.log('Converting HEIC to JPG...');
      const blob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.85
      }) as Blob;
      
      console.log('HEIC conversion successful');
      return new File([blob], file.name.replace(/\.heic$/i, '.jpg'), {
        type: 'image/jpeg'
      });
    } catch (error) {
      console.error('Error converting HEIC to JPG:', error);
      throw new Error('Failed to convert HEIC image');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];
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
      // Convert HEIC to JPG if necessary
      if (file.type.toLowerCase() === 'image/heic') {
        toast.info("Converting HEIC image...");
        file = await convertHeicToJpg(file);
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error('No active session found');
        toast.error("Please log in to upload photos");
        return;
      }

      // Upload to Supabase Storage with proper path structure
      const fileExt = file.type === 'image/jpeg' ? 'jpg' : 'png';
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      console.log('Uploading file to path:', filePath);
      
      const { error: uploadError, data } = await supabase.storage
        .from('user-uploads')
        .upload(filePath, file, {
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-uploads')
        .getPublicUrl(filePath);

      // Save to database
      const { error: dbError } = await supabase
        .from('progress_photos')
        .insert([
          {
            user_id: session.user.id,
            photo_url: publicUrl,
          },
        ]);

      if (dbError) throw dbError;

      toast.success("Photo uploaded successfully");
      await loadPhotos();
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      toast.error(error.message || "Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (photoId: string, photoUrl: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please log in to delete photos");
        return;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('progress_photos')
        .delete()
        .eq('id', photoId);

      if (dbError) throw dbError;

      // Extract file path from URL and delete from storage
      const pathMatch = photoUrl.match(/user-uploads\/(.+)$/);  // Updated regex pattern
      if (!pathMatch) throw new Error("Invalid photo URL format");
      
      const filePath = pathMatch[1];
      const { error: storageError } = await supabase.storage
        .from('user-uploads')  // Updated bucket name
        .remove([filePath]);

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
