import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankAccountFormSchema, BankAccountFormData } from "@/schemas/bankAccountSchema";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import Button from "@/components/Button";
import { useEffect } from "react";
import { useCreateBankAccount } from "@/hooks/bankAccount";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CPFMask, CNPJMask, BankAccountMask } from "@/utils/masks";

interface AddBankAccountModalProps {
  onClose: () => void;
}

export const AddBankAccountModal = ({ onClose }: AddBankAccountModalProps) => {
  const methods = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountFormSchema),
  });

  const { user } = useAuth();
  const { mutate, isLoading } = useCreateBankAccount();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitted },
  } = methods;

  const accountType = watch("accountType");
  const documentValue = watch("documentValue");

  useEffect(() => {
    setValue("documentValue", "");
    clearErrors("documentValue");
  }, [accountType, setValue, clearErrors]);

  const getDocumentMask = () => {
    switch (accountType) {
      case "CPF":
        return CPFMask;
      case "CNPJ":
        return CNPJMask;
      default:
        return undefined;
    }
  };

  const getDocumentPlaceholder = () => {
    switch (accountType) {
      case "CPF":
        return "000.000.000-00";
      case "CNPJ":
        return "00.000.000/0000-00";
      default:
        return "Selecione o tipo de conta";
    }
  };

  const getDocumentLabel = () => {
    switch (accountType) {
      case "CPF":
        return "CPF";
      case "CNPJ":
        return "CNPJ";
      default:
        return "Documento";
    }
  };

  function removeMask(value: string) {
    if (!value) return value;
    return value.replace(/\D/g, "").replace(/\s/g, "");
  }

  function removeWhitespace(value: string) {
    return value.replace(/\s/g, "");
  }

  const onSubmit: SubmitHandler<BankAccountFormData> = async (data) => {
    const dataToSend = {
      type: data.accountType === "CPF" ? "PERSONAL" : "BUSINESS",
      account: data.accountNumber, // Número da conta bancária
      ...(data.accountType === "CPF" && {
        cpf: removeMask(data.documentValue)
      }),
      ...(data.accountType === "CNPJ" && {
        cnpj: removeMask(data.documentValue)
      }),
      userId: user?.id ?? '',
    };

    mutate(dataToSend, {
      onSuccess: () => {
        toast.success("Conta bancária cadastrada com sucesso!", {
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
          label="Tipo da Conta"
          options={["Conta física", "Conta jurídica"]}
          values={["CPF", "CNPJ"]}
          register={register("accountType")}
          error={isSubmitted ? errors.accountType?.message : undefined}
        />

        <InputField
          label={getDocumentLabel()}
          placeholder={getDocumentPlaceholder()}
          register={register("documentValue", {
            required: "O documento é obrigatório",
          })}
          error={isSubmitted ? errors.documentValue?.message : undefined}
          mask={getDocumentMask()}
          numbersOnly
          disabled={!accountType}
          name="documentValue"
        />

        <InputField
          label="Número da Conta Bancária com Dígito"
          placeholder="000000"
          register={register("accountNumber", {
            required: "O número da conta é obrigatório"
          })}
          numbersOnly
          mask={BankAccountMask}
          maxLength={20}
          disabled={!accountType}
          error={isSubmitted ? errors.accountNumber?.message : undefined}
          name="accountNumber"
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
            aria-label="Salvar conta bancária"
            disabled={!documentValue || !accountType || isLoading}
            loading={isLoading}
          >
            Salvar Conta Bancária
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};