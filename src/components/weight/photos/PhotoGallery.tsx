import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useMemo, useState } from "react";
import { cn, formatWeight } from "@/lib/utils";

interface Photo {
  id: string;
  photo_url: string;
  created_at: string;
  entry_id: string;
}

interface Entry {
  entry_id: string;
  created_at: string;
  photos: Photo[];
}

interface WeightLog {
  weight: number;
  created_at: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  weightLogs?: WeightLog[];
  onDelete: (photoId: string, photoUrl: string) => void;
  onAddToEntry: (entryId: string, files: FileList) => void;
}

const EntryCard = ({
  entry,
  weight,
  onDelete,
  onAddToEntry,
  onOpen,
}: {
  entry: Entry;
  weight: number | null;
  onDelete: (photoId: string, photoUrl: string) => void;
  onAddToEntry: (entryId: string, files: FileList) => void;
  onOpen: (photo: Photo) => void;
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const inputId = `add-photos-${entry.entry_id}`;

  return (
    <div className="relative group">
      <Carousel setApi={setApi} opts={{ loop: entry.photos.length > 1 }}>
        <CarouselContent>
          {entry.photos.map((photo) => (
            <CarouselItem key={photo.id}>
              <AspectRatio
                ratio={3 / 4}
                className="bg-muted cursor-pointer"
                onClick={() => onOpen(photo)}
              >
                <img
                  src={photo.photo_url}
                  alt={`Progress photo from ${format(new Date(photo.created_at), "PPP")}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(photo.id, photo.photo_url);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {entry.photos.length > 1 && (
          <>
            <CarouselPrevious className="left-2 h-7 w-7" />
            <CarouselNext className="right-2 h-7 w-7" />
          </>
        )}
      </Carousel>

      {entry.photos.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {entry.photos.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === current ? "bg-primary" : "bg-muted-foreground/40"
              )}
            />
          ))}
        </div>
      )}

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">
            {format(new Date(entry.created_at), "PPp")}
          </p>
          {weight !== null && (
            <p className="text-sm font-medium">{formatWeight(weight)} lbs</p>
          )}
        </div>
        <label htmlFor={inputId}>
          <input
            id={inputId}
            type="file"
            accept="image/*,.heic"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onAddToEntry(entry.entry_id, e.target.files);
                e.target.value = "";
              }
            }}
          />
          <Button asChild variant="outline" size="sm" className="h-7 cursor-pointer">
            <span>
              <Plus className="w-3 h-3 mr-1" /> Add photo
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
};

const PhotoGallery = ({ photos, weightLogs = [], onDelete, onAddToEntry }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const entries = useMemo<Entry[]>(() => {
    const map = new Map<string, Entry>();
    for (const p of photos) {
      const existing = map.get(p.entry_id);
      if (existing) {
        existing.photos.push(p);
        if (new Date(p.created_at) < new Date(existing.created_at)) {
          existing.created_at = p.created_at;
        }
      } else {
        map.set(p.entry_id, {
          entry_id: p.entry_id,
          created_at: p.created_at,
          photos: [p],
        });
      }
    }
    for (const entry of map.values()) {
      entry.photos.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [photos]);

  const sortedWeights = useMemo(
    () =>
      [...weightLogs].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [weightLogs]
  );

  const weightForEntry = (entryDate: string): number | null => {
    const entryTime = new Date(entryDate).getTime();
    const match = sortedWeights.find(
      (w) => new Date(w.created_at).getTime() <= entryTime
    );
    return match ? Number(match.weight) : sortedWeights.length > 0 ? Number(sortedWeights[sortedWeights.length - 1].weight) : null;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <EntryCard
            key={entry.entry_id}
            entry={entry}
            weight={weightForEntry(entry.created_at)}
            onDelete={onDelete}
            onAddToEntry={onAddToEntry}
            onOpen={setSelectedPhoto}
          />
        ))}

        {entries.length === 0 && (
          <div className="text-center text-muted-foreground mt-8 col-span-full">
            No progress photos uploaded yet
          </div>
        )}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-screen-lg h-[90vh] flex items-center justify-center p-0">
          {selectedPhoto && (
            <img
              src={selectedPhoto.photo_url}
              alt={`Progress photo from ${format(new Date(selectedPhoto.created_at), "PPP")}`}
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;
