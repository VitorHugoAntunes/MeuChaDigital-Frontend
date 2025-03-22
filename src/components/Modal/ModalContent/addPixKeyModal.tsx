import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pixFormSchema, PixFormData } from "@/schemas/pixKeySchema";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { useEffect } from "react";
import { useCreatePixKey } from "@/hooks/pixKey";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CPFMask, PhoneMask } from "@/utils/masks";

interface AddPixModalProps {
  onClose: () => void;
}

export const AddPixKeyModal = ({ onClose }: AddPixModalProps) => {
  const methods = useForm<PixFormData>({
    resolver: zodResolver(pixFormSchema),
  });

  const { user } = useAuth();
  const { mutate, isLoading } = useCreatePixKey();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitted },
  } = methods;

  const keyType = watch("keyType");
  const keyValue = watch("keyValue");

  useEffect(() => {
    setValue("keyValue", "");
    clearErrors("keyValue");
  }, [keyType, setValue, clearErrors]);

  const getMask = (type: string) => {
    switch (type) {
      case "CPF":
        return CPFMask;
      case "PHONE":
        return PhoneMask;
      case "EMAIL":
      case "RANDOM":
      default:
        return undefined;
    }
  };

  function removeMask(value: string, keyType: string) {
    if (keyType === "RANDOM" || keyType === "EMAIL") {
      return value;
    }

    return value.replace(/\D/g, '');
  }

  const onSubmit: SubmitHandler<PixFormData> = async (data) => {
    const dataToSend = {
      key: removeMask(data.keyValue, data.keyType),
      type: data.keyType,
      userId: user?.id ?? '',
    };

    mutate(dataToSend, {
      onSuccess: () => {
        toast.success("Chave PIX salva com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        onClose();
      },
      onError: (error: any) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputSelect
          label="Tipo da Chave"
          options={["CPF", "E-mail", "Telefone", "Chave Aleatória"]}
          values={["CPF", "EMAIL", "PHONE", "RANDOM"]}
          register={register("keyType")}
          error={isSubmitted ? errors.keyType?.message : undefined}
        />

        <InputField
          label="Valor da Chave"
          type={keyType === "CPF" ? "text" : keyType === "PHONE" ? "tel" : "email"}
          placeholder="Digite o valor da chave"
          register={register("keyValue")}
          error={isSubmitted ? errors.keyValue?.message : undefined}
          mask={getMask(keyType)}
          disabled={!keyType}
          name="keyValue"
        />

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            variant="outlined-danger"
            widthFull
            onClick={onClose}
            aria-label="Cancelar"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            widthFull
            aria-label="Salvar chave PIX"
            disabled={!keyValue || !keyType || isLoading}
            loading={isLoading}
          >
            Salvar Chave PIX
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};