"use client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ImageIcon, Loader2, MousePointerSquareDashed } from "lucide-react";
import React, {
  useState,
  useTransition,
} from "react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

const Dropzone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete([data]) {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);

    if (files && files[0]) {
      if (files[0].type.startsWith("image/")) {
        startUpload(files, { configId: undefined });
      } else {
        toast({
          title: `${files[0].type} type is not supported`,
          description: "Please choose a PNG, JPG, or JPEG image instead.",
          variant: "destructive",
        });
      }
    }
  };
  // relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center

  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center flex-1 h-full items-center my-16 bg-zinc-900/5 rounded-xl lg:rounded-2xl dark:bg-zinc-100/5 py-8 px-2 transition ring-1 ring-inset ring-zinc-900/10 dark:ring-zinc-100/10",
        isDragging &&
          "bg-blue-900/10 ring-blue-900/25 dark:bg-blue-100/10 dark:ring-blue-100/25"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files && files[0]) {
              if (files[0].type.startsWith("image/")) {
                startUpload(files, { configId: undefined });
              } else {
                toast({
                  title: `${files[0].type} type is not supported`,
                  description:
                    "Please choose a PNG, JPG, or JPEG image instead.",
                  variant: "destructive",
                });
              }
            }
          }}
        />
        {isDragging ? (
          <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
        ) : isUploading || isPending ? (
          <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
        ) : (
          <ImageIcon className="h-6 w-6 text-zinc-500 mb-2" />
        )}

        <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700 dark:text-zinc-300">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <p>Uploading...</p>
              <Progress
                value={uploadProgress}
                className="mt-2 w-40 h-2 bg-gray-300"
              />
            </div>
          ) : isPending ? (
            <div className="flex flex-col items-center">
              <p>Redirecting, please wait...</p>
            </div>
          ) : isDragging ? (
            <p>
              <span className="font-semibold text-blue-600 dark:text-blue-500">
                Drop file
              </span>{" "}
              to upload
            </p>
          ) : (
            <p>
              <label
                htmlFor="file-upload"
                className="font-semibold text-blue-600 dark:text-blue-500 transition hover:underline cursor-pointer"
              >
                Click to upload
              </label>{" "}
              or drag and drop
            </p>
          )}
        </div>

        {isPending ? null : (
          <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
