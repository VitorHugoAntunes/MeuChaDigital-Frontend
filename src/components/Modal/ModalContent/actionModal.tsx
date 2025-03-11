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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSuccess) {
      await onSuccess();
    }
  };

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