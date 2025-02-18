"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

export default function Step2() {
  const [bannerImage, setBannerImage] = useState<File | null>(null);

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerImage(file);
    }
  };

  return (
    <div className="mb-4 flex flex-col w-full">
      <form>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Foto Banner</label>
          <div className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="text-center">
              {bannerImage ? (
                <Image
                  src={URL.createObjectURL(bannerImage)}
                  alt="Banner"
                  className="mx-auto h-32 w-full object-cover rounded-md"
                />
              ) : (
                <>
                  <ImageIcon size={32} className='mx-auto text-gray-400' />
                  <p className="mt-1 text-sm text-gray-600">
                    Arraste e solte uma imagem ou{' '}
                    <span className="font-medium text-primary">clique para carregar</span>
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="sr-only"
                id="banner-upload"
              />
              <label
                htmlFor="banner-upload"
                className="mt-2 inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Carregar Imagem
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}