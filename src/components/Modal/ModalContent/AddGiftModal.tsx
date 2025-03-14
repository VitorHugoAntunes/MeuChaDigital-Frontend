import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { giftSchema, GiftFormData } from "@/schemas/createGiftSchema";
import { useCreateGift } from "@/hooks/gifts";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import InputFileUpload from "@/components/InputFileUpload";
import Button from "@/components/Button";

import { CurrencyMask } from "@/utils/masks";
import InputTextArea from "@/components/InputTextArea";

const CATEGORIES = [
  { id: "d85d70fa-c52f-4e88-9200-8d15b146adbe", text: "Eletrônico" },
  { id: "d85d70fa-c52f-4e88-9200-8d15b146adbe", text: "Casa" },
  { id: "d85d70fa-c52f-4e88-9200-8d15b146adbe", text: "Lazer" },
  { id: "d85d70fa-c52f-4e88-9200-8d15b146adbe", text: "Outros" },
];

const PRIORITIES = [
  { value: "LOW", text: "Baixa" },
  { value: "MEDIUM", text: "Média" },
  { value: "HIGH", text: "Alta" },
];

interface AddGiftModalProps {
  giftListId: string;
  userId: string;
  onSuccess?: () => void;
  onClose: () => void;
}

export const AddGiftModal = ({ giftListId, userId, onSuccess, onClose }: AddGiftModalProps) => {
  const [giftPhoto, setGiftPhoto] = useState<File | null>(null);
  console.log("id do usuário:", userId);

  const methods = useForm<GiftFormData>({
    resolver: zodResolver(giftSchema),
    defaultValues: {
      name: "",
      totalValue: undefined,
      categoryId: "",
      priority: "MEDIUM",
      description: "",
      giftPhoto: undefined,
      userId,
      giftListId,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitted },
  } = methods;

  const { mutate: createGiftMutation, isLoading } = useCreateGift();

  const handleGiftPhotoChange = useCallback((file: File | null) => {
    if (file) {
      setGiftPhoto(file);
      setValue("giftPhoto", file);
      clearErrors("giftPhoto");
    } else {
      setGiftPhoto(null);
      setValue("giftPhoto", undefined);
    }
  }, [setValue, clearErrors]);


  const onSubmit: SubmitHandler<GiftFormData> = async (data) => {
    console.log("onSubmit foi chamado!");
    console.log("Dados do formulário:", data);

    if (!giftPhoto) {
      alert("Por favor, adicione uma foto do presente.");
      return;
    }

    const dataToSend = {
      giftListId,
      data: {
        ...data,
        userId,
        categoryId: data.categoryId,
        priority: data.priority,
        totalValue: Number(data.totalValue),
      },
    };

    try {
      createGiftMutation(dataToSend, {
        onSuccess: () => {
          console.log("Presente criado com sucesso!");
          onSuccess?.();
          onClose();
        },
        onError: (error) => {
          console.error("Erro ao adicionar presente:", error);
        },
      });
    } catch (error) {
      console.error("Erro ao adicionar presente:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <p className="text-sm text-text-secondary mb-6">
        Adicione um lindo presente para sua lista de presentes.
      </p>

      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="Nome do presente"
          type="text"
          placeholder="Digite o nome do presente"
          register={{ ...register("name", { required: "Nome do presente é obrigatório" }) }}
          error={errors.name?.message}
        />

        <InputField
          label="Preço estimado"
          type="text"
          placeholder="R$ 0,00"
          register={register("totalValue", {
            required: "O valor é obrigatório",
            setValueAs: (value) => {
              const numericValue = Number(value.replace(/\D/g, "")) / 100;
              return isNaN(numericValue) || numericValue === 0 ? undefined : numericValue;
            },
          })}
          error={isSubmitted ? errors.totalValue?.message : undefined}
          isNumeric={true}
          mask={CurrencyMask}
          min={0.01}
        />

        <div className="grid grid-cols-2 gap-4">
          <InputSelect
            label="Categoria"
            options={CATEGORIES.map((cat) => cat.text)}
            values={CATEGORIES.map((cat) => cat.id)}
            register={{
              ...register("categoryId", {
                required: "Categoria é obrigatória",

              })
            }}
            error={errors.categoryId?.message}
          />

          <InputSelect
            label="Prioridade"
            options={PRIORITIES.map((p) => p.text)}
            values={PRIORITIES.map((p) => p.value)}
            register={{ ...register("priority", { required: "Prioridade é obrigatória" }) }}
            error={errors.priority?.message}
          />
        </div>

        <InputTextArea
          label="Descrição"
          placeholder="Descreva o presente"
          register={{ ...register("description", { required: "Descrição é obrigatória" }) }}
          error={errors.description?.message}
        />

        <div className="flex flex-col justify-between">
          <InputFileUpload
            label="Foto"
            onFileSelect={handleGiftPhotoChange}
          />
          {errors.giftPhoto?.message && (
            <span className="text-red-500 text-sm mt-1">
              {errors.giftPhoto.message}
            </span>
          )}
        </div>

        <div className="flex justify-between gap-4">
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
            aria-label="Adicionar presente"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Adicionando..." : "Adicionar presente"}
            <Plus />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};