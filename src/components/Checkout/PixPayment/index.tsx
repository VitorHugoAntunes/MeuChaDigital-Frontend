import Button from "@/components/Button";
import Divider from "@/components/Divider";
import { ClipboardCopy, QrCode } from "lucide-react";
import { useState } from "react";

export default function PixPayment() {
  const [generateQrCode, setGenerateQrCode] = useState(false);

  function handleGenerateQrCode() {
    setGenerateQrCode(!generateQrCode);
  }

  return (
    <div className="text-center">
      {generateQrCode ? (
        <>
          <header className="mb-4">
            <h2 className="text-lg font-bold text-text-primary">Escaneie o QR Code</h2>
          </header>

          <div className="flex flex-col items-center text-center">
            <picture className="mb-4">
              <QrCode size={200} />
            </picture>

            <p className="text-sm text-gray-500">
              Escaneie o QR Code com o aplicativo do seu banco para realizar o pagamento.
            </p>

            <Divider />

            <p className="text-sm text-gray-500 mb-4">Este QR Code expira em 24 horas.</p>

            <Button widthFull>
              <ClipboardCopy size={20} />
              Copiar código
            </Button>
          </div>
        </>
      ) : (
        <>
          <header className="mb-2">
            <h2 className="text-lg font-bold text-text-primary">Pagamento via Pix</h2>
          </header>

          <p className="text-sm text-gray-500 mb-4">
            Gere um QR Code exclusivo para realizar o pagamento via Pix.
          </p>

          <Button onClick={handleGenerateQrCode} widthFull>Gerar QR Code</Button>
        </>
      )}
    </div>
  );
}