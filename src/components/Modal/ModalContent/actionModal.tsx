import Button from "@/components/Button";

import "react-toastify/dist/ReactToastify.css";

interface ActionModalProps {
  description: string;
  action: string;
  isLoading?: boolean;
  onSuccess?: () => void;
  onClose: () => void;
}

export const ActionModal = ({ description, action, isLoading, onSuccess, onClose }: ActionModalProps) => {
  console.log("Executando ActionModal");
  console.log("está carregando?", isLoading);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Executando handleSubmit");
    console.log("está carregando?", isLoading);

    if (onSuccess) {
      await onSuccess();
    }

    if (!isLoading) {
      setTimeout(() => {
        onClose();
      }, 200);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <p className="text-text-secondary">{description}</p>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outlined-danger"
          onClick={onClose}
          widthFull
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="danger" widthFull disabled={isLoading} loading={isLoading}>
          {action}
        </Button>
      </div>
    </form>
  );
};
