"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
}

export default function InputFileUpload({ label, onFileSelect }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-2 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
        {selectedFile ? (
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Imagem selecionada"
            className="h-32 w-full object-cover rounded-md"
            width={300}
            height={128}
          />
        ) : (
          <div className="flex flex-col items-center text-center">
            <ImageIcon size={40} className="text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Arraste e solte uma imagem ou clique no botão abaixo para carregar
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          className="sr-only"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="mt-3 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
        >
          Escolher imagem
        </label>
      </div>
    </div>
  );
}
