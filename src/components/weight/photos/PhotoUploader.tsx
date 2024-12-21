import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, ImageIcon } from "lucide-react";

interface PhotoUploaderProps {
  uploading: boolean;
  uploadProgress: number;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhotoUploader = ({ uploading, uploadProgress, onFileUpload }: PhotoUploaderProps) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <Input
          type="file"
          accept="image/*,.heic"
          onChange={onFileUpload}
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

      <div className="mt-2 text-sm text-muted-foreground text-center">
        <p>Maximum file size: 5MB</p>
        <p>Supported formats: JPEG, PNG, HEIC</p>
      </div>

      {uploading && (
        <Progress value={uploadProgress} className="mt-4" />
      )}
    </div>
  );
};

export default PhotoUploader;