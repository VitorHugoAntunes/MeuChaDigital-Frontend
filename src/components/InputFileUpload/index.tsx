import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, Trash } from "lucide-react";

interface FileUploadProps {
  label: string;
  initialFile?: File | null;
  trigger?: any;
  onFileSelect: (file: File | null) => void;
}

export default function InputFileUpload({ label, initialFile, trigger, onFileSelect }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFile) {
      setSelectedFile(initialFile);
    }
  }, [initialFile]);

  useEffect(() => {
    onFileSelect(selectedFile);
  }, [selectedFile, onFileSelect]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    trigger("banner");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    trigger("banner");
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-bold text-gray-700 dark:text-text-secondary">{label}</label>
      <div className="mt-2 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-input-border border-dashed rounded-lg">
        {selectedFile ? (
          <div className="relative flex justify-center w-full">
            <div className="relative">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Imagem selecionada"
                className="h-32 object-cover rounded-md"
                width={300}
                height={128}
              />
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-md border-2 border-danger shadow-md hover:bg-danger transition-colors duration-300 group/delete"
                onClick={handleRemoveFile}
                type="button"
                title="Remover imagem"
              >
                <Trash size={18} className="text-danger group-hover/delete:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <ImageIcon size={40} className="text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-text-secondary">
              Arraste e solte uma imagem ou clique no botão abaixo para carregar
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          id="banner-upload"
          className="sr-only"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <label
          htmlFor="banner-upload"
          className="mt-3 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
        >
          Escolher imagem
        </label>
      </div>
    </div>
  );
}