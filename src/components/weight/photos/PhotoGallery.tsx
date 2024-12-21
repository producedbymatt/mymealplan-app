import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

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
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <AspectRatio 
              ratio={3/4} 
              className="bg-muted cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.photo_url}
                alt={`Progress photo from ${format(new Date(photo.created_at), 'PPP')}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </AspectRatio>
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

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-screen-lg h-[90vh] flex items-center justify-center p-0">
          {selectedPhoto && (
            <img
              src={selectedPhoto.photo_url}
              alt={`Progress photo from ${format(new Date(selectedPhoto.created_at), 'PPP')}`}
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;