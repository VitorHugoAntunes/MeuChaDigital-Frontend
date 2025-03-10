"use client";

import { useState, useCallback } from "react";
import FileUpload from "@/components/InputFileUpload";
import { useFormContext } from "react-hook-form";
import MultiFileUpload from "@/components/InputMultiFileUpload";

export default function Step2() {
  const { setValue, trigger, watch, formState: { errors, isSubmitted } } = useFormContext();

  const momentsImages = watch("moments_images");

  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [momentImages, setMomentImages] = useState<File[]>([]);

  const handleBannerImageChange = useCallback((file: File | null) => {
    setBannerImage(file);
    setValue("banner", file || undefined);
    trigger("banner");
  }, [setValue, trigger]);

  const handleMomentImagesChange = useCallback((files: File[]) => {
    setMomentImages(files);
    setValue("moments_images", files.length > 0 ? files : undefined);
    trigger("moments_images");
  }, [setValue, trigger]);

  return (
    <div className="mb-4 flex flex-col w-full">
      <div className="mb-6">
        <FileUpload label="Foto de capa" onFileSelect={handleBannerImageChange} />
        {errors.banner?.message && (
          <span className="text-danger text-sm mt-1">{errors.banner.message.toString()}</span>
        )}
      </div>

      <div className="mb-6">
        <MultiFileUpload
          label="Momentos"
          description="Adicione fotos dos momentos especiais do evento, essas fotos serão exibidas no convite virtual."
          onFilesSelect={handleMomentImagesChange}
        />
        {isSubmitted && errors.moments_images?.message && (
          <span className="text-danger text-sm mt-1">{errors.moments_images.message.toString()}</span>
        )}
      </div>
    </div>
  );
}
