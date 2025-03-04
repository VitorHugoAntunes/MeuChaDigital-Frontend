"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddPixModalProps {
  onClose: () => void;
}

interface PixFormData {
  keyType: string;
  keyValue: string;
}

export const AddPixKeyModal = ({ onClose }: AddPixModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PixFormData>();

  const onSubmit: SubmitHandler<PixFormData> = (data) => {
    console.log("Formulário enviado:", data);
    alert("Chave PIX salva com sucesso!");
    onClose(); // Fecha o modal após o envio
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputSelect
        label="Tipo da Chave"
        options={["CPF", "E-mail", "Telefone", "Chave Aleatória"]}
        register={{ ...register("keyType", { required: "Selecione o tipo da chave" }) }}
        error={errors.keyType?.message}
      />

      <InputField
        label="Valor da Chave"
        type="text"
        placeholder="Digite o valor da chave"
        register={{ ...register("keyValue", { required: "O valor da chave é obrigatório" }) }}
        error={errors.keyValue?.message}
      />

      <div className="flex justify-between gap-4">
        <Button
          variant="outlined-danger"
          widthFull
          onClick={onClose}
          aria-label="Cancelar"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          widthFull
          aria-label="Salvar chave PIX"
        >
          Salvar Chave PIX
        </Button>
      </div>
    </form>
  );
};