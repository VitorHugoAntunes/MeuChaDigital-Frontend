import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ImageIcon, Trash2 } from "lucide-react";

interface MultiFileUploadProps {
  label: string;
  description?: string;
  onFilesSelect: (files: File[]) => void;
  maxFiles?: number;
}

export default function MultiFileUpload({ label, description, onFilesSelect, maxFiles = 5 }: MultiFileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onFilesSelect(selectedFiles);
  }, [selectedFiles, onFilesSelect]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles].slice(0, maxFiles);
      return updatedFiles;
    });
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((_, i) => i !== index);
      return newFiles;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <div className="mt-2 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
        {selectedFiles.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Imagem ${index + 1}`}
                  className="h-32 w-full object-cover rounded-md"
                  width={300}
                  height={128}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-100 hover:opacity-90 transition-opacity"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <ImageIcon size={40} className="text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Arraste e solte até {maxFiles} imagens ou clique no botão abaixo para carregar
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          id="moments-upload"
          className="sr-only"
          onChange={handleFileChange}
          multiple
          disabled={selectedFiles.length >= maxFiles}
          ref={fileInputRef}
        />
        <label
          htmlFor="moments-upload"
          className={`mt-3 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white ${selectedFiles.length >= maxFiles
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-primary-dark cursor-pointer"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        >
          Escolher imagens
        </label>
        {selectedFiles.length >= maxFiles && (
          <p className="mt-2 text-sm text-red-500">
            Você atingiu o limite máximo de {maxFiles} imagens.
          </p>
        )}
      </div>
    </div>
  );
}
