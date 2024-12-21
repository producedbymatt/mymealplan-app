import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Photo {
  id: string;
  photo_url: string;
  created_at: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onDelete: (photoId: string, photoUrl: string) => void;
}

const PhotoGallery = ({ photos, onDelete }: PhotoGalleryProps) => {
  return (
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
            onClick={() => onDelete(photo.id, photo.photo_url)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      {photos.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          No progress photos uploaded yet
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;