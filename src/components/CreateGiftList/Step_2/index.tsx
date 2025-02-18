"use client";

import { useState } from "react";
import FileUpload from "@/components/InputFileUpload"; // Caminho conforme sua estrutura

export default function Step2() {
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  console.log(bannerImage);

  return (
    <div className="mb-4 flex flex-col w-full">
      <form>
        <div className="mb-6">
          <FileUpload label="Foto Banner" onFileSelect={setBannerImage} />
        </div>
      </form>
    </div>
  );
}
