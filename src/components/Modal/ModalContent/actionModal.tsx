import Button from "@/components/Button";

import "react-toastify/dist/ReactToastify.css";

interface ActionModalProps {
  description: string;
  action: string;
  isActionSuccess?: boolean;
  isLoading?: boolean;
  onSuccess?: () => void;
  onClose: () => void;
}

export const ActionModal = ({ description, action, isActionSuccess, isLoading, onSuccess, onClose }: ActionModalProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSuccess) {
      await onSuccess();
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <p className="text-text-secondary">{description}</p>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          type="button"
          variant="outlined-danger"
          onClick={onClose}
          widthFull
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" variant={
          isActionSuccess ? "default" : "danger"
        } widthFull disabled={isLoading} loading={isLoading}>
          {action}
        </Button>
      </div>
    </form>
  );
};