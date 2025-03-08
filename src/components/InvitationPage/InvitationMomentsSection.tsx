import Image from 'next/image';

interface MomentImageProps {
  src: string;
  alt: string;
}

interface MomentImagesProps {
  momentsImages: { url: string }[]; // Array de objetos com a propriedade `url`
}

function MomentImage({ src, alt }: MomentImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
    />
  );
}

export default function InvitationMomentsSection({ momentsImages }: MomentImagesProps) {
  // Verifica se momentsImages foi fornecido e tem pelo menos uma imagem
  if (!momentsImages || momentsImages.length === 0) {
    return null; // Ou exibe uma mensagem de fallback, como: <p>Nenhuma imagem disponível.</p>
  }

  return (
    <section id="moments" className="w-screen relative left-1/2 right-1/2 -mx-[50vw] flex flex-col items-center py-16 mt-8 bg-white">
      <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Nossos momentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4">
        {momentsImages.map((image, index) => {
          // Lógica para definir o layout das imagens
          if (index % 3 === 0) {
            // Primeira imagem de cada grupo de 3 (ocupa 2 colunas)
            return (
              <div key={index} className="md:col-span-2">
                <MomentImage src={image.url} alt={`Momento ${index + 1}`} />
              </div>
            );
          } else {
            // Segunda e terceira imagens de cada grupo de 3 (ocupam 1 coluna cada)
            return (
              <div key={index} className="flex justify-start">
                <MomentImage src={image.url} alt={`Momento ${index + 1}`} />
              </div>
            );
          }
        })}
      </div>
    </section>
  );
}