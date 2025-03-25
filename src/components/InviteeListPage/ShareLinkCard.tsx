import { ClipboardCopy } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";
import { toast } from "react-toastify";

interface ShareLinkCardProps {
  slug: string;
}

export const ShareLinkCard = ({ slug }: ShareLinkCardProps) => {
  const handleCopyLink = () => {
    const link = `http://${slug}.meuchadigital.com/invitation`;
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência!", {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Card className="flex flex-col w-full mt-8">
      <h2 className="text-lg font-semibold text-text-primary text-center md:text-left">
        Compartilhar link de convite
      </h2>
      <p className="text-text-secondary mt-2 text-center md:text-left">
        Compartilhe o link abaixo com seus convidados para que eles possam confirmar presença
      </p>

      <div className="flex flex-col md:flex-row items-center w-full mt-4 gap-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 text-text-primary bg-gray-100 border border-gray-300 rounded-lg md:rounded-l-lg focus:outline-none w-full"
          readOnly
          value={`http://${slug}.localhost:3000/invitation`}
        />
        <div className="w-full md:w-auto">
          <Button onClick={handleCopyLink} widthFull>
            <ClipboardCopy size={20} />
            Copiar link
          </Button>
        </div>
      </div>

      <Link
        href={`http://${slug}.localhost:3000/invitation`}
        className="w-fit mt-4 text-center md:text-left text-primary hover:text-primary-light underline hover:no-underline transition-colors duration-300 mx-auto md:mx-0"
      >
        Ver link de convite
      </Link>
    </Card>
  );
};