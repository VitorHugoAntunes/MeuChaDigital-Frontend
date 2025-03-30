"use client";

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MomentImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

interface MomentImagesProps {
  momentsImages: { url: string }[];
}

function MomentImage({ src, alt, onClick }: MomentImageProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-full h-80 md:h-[500px] lg:h-[600px] rounded-2xl shadow-lg hover:shadow-xl overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function InvitationMomentsSection({ momentsImages }: MomentImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (selectedImage) {
      html.classList.add("overflow-y-hidden");
      body.classList.add("overflow-y-hidden");
    } else {
      html.classList.remove("overflow-y-hidden");
      body.classList.remove("overflow-y-hidden");
    }

    return () => {
      html.classList.remove("overflow-y-hidden");
      body.classList.remove("overflow-y-hidden");
    };
  }, [selectedImage]);

  if (!momentsImages || momentsImages.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex(prev =>
      prev === 0 ? momentsImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prev =>
      prev === momentsImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="moments" className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex flex-col items-center py-16 mt-8 ">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nossos Momentos</h2>

      <div className="w-full max-w-6xl px-4 relative">
        <div className="relative w-full overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-300 rounded-lg" style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
            {momentsImages.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 rounded-lg">
                <MomentImage
                  src={image.url}
                  alt={`Momento ${index + 1}`}
                  onClick={() => setSelectedImage(image.url)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white"
          aria-label="Imagem anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md z-10 hover:bg-white"
          aria-label="Próxima imagem"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="flex justify-center mt-4 space-x-2">
          {momentsImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-[90vh] flex flex-col">
            <button
              className="self-end mb-2 text-white hover:text-gray-300 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Fechar imagem"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative flex-1">
              <Image
                src={selectedImage}
                alt="Imagem ampliada"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}