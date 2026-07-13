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
  entry_id: string;
}

interface WeightLog {
  weight: number;
  created_at: string;
}

const ProgressPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
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
      if (!session) return;

      const [photosRes, weightsRes] = await Promise.all([
        supabase
          .from('progress_photos')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('weight_logs')
          .select('weight, created_at')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false }),
      ]);

      if (photosRes.error) throw photosRes.error;
      if (weightsRes.error) throw weightsRes.error;

      setWeightLogs((weightsRes.data || []) as WeightLog[]);

      const withSigned = await Promise.all(
        ((photosRes.data || []) as any[]).map(async (p) => {
          const match = p.photo_url.match(/user-uploads\/(.+)$/);
          const path = match ? match[1] : p.photo_url;
          const { data: signed } = await supabase.storage
            .from('user-uploads')
            .createSignedUrl(path, 60 * 60);
          return {
            id: p.id,
            created_at: p.created_at,
            entry_id: p.entry_id,
            photo_url: signed?.signedUrl || p.photo_url,
          } as Photo;
        })
      );
      setPhotos(withSigned);
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error("Failed to load progress photos");
    }
  };

  const convertHeicToJpg = async (file: File): Promise<File> => {
    const blob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.85,
    }) as Blob;
    return new File([blob], file.name.replace(/\.heic$/i, '.jpg'), { type: 'image/jpeg' });
  };

  const uploadFiles = async (files: File[], entryId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please log in to upload photos");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const validTypes = ['image/jpeg', 'image/png', 'image/heic'];
      const total = files.length;
      let done = 0;

      for (let file of files) {
        if (!validTypes.includes(file.type.toLowerCase())) {
          toast.error(`Skipping ${file.name}: unsupported format`);
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`Skipping ${file.name}: over 5MB`);
          continue;
        }

        if (file.type.toLowerCase() === 'image/heic') {
          file = await convertHeicToJpg(file);
        }

        const fileExt = file.type === 'image/jpeg' ? 'jpg' : 'png';
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${session.user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('user-uploads')
          .upload(filePath, file, { upsert: false, contentType: file.type });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('user-uploads')
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase
          .from('progress_photos')
          .insert([{
            user_id: session.user.id,
            photo_url: publicUrl,
            entry_id: entryId,
          } as any]);

        if (dbError) throw dbError;

        done += 1;
        setUploadProgress(Math.round((done / total) * 100));
      }

      toast.success(files.length > 1 ? "Photos uploaded" : "Photo uploaded");
      await loadPhotos();
    } catch (error: any) {
      console.error('Error uploading photos:', error);
      toast.error(error.message || "Failed to upload photos");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const entryId = crypto.randomUUID();
    await uploadFiles(Array.from(files), entryId);
    event.target.value = "";
  };

  const handleAddToEntry = async (entryId: string, files: FileList) => {
    await uploadFiles(Array.from(files), entryId);
  };

  const handleDelete = async (photoId: string, photoUrl: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to delete photos");
        return;
      }

      const { error: dbError } = await supabase
        .from('progress_photos')
        .delete()
        .eq('id', photoId);
      if (dbError) throw dbError;

      const pathMatch = photoUrl.match(/user-uploads\/([^?]+)/);
      if (pathMatch) {
        await supabase.storage.from('user-uploads').remove([pathMatch[1]]);
      }

      toast.success("Photo deleted");
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
        Upload photos to visually track your progress over time. Add multiple angles to a single entry.
      </p>

      <PhotoUploader
        uploading={uploading}
        uploadProgress={uploadProgress}
        onFileUpload={handleFileUpload}
      />

      <PhotoGallery
        photos={photos}
        weightLogs={weightLogs}
        onDelete={handleDelete}
        onAddToEntry={handleAddToEntry}
      />
    </Card>
  );
};

export default ProgressPhotos;
