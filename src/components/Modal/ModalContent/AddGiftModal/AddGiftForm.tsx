import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { giftSchema, GiftFormData, GiftUpdateFormData } from "@/schemas/createGiftSchema";
import { useCreateGift, useUpdateGift } from "@/hooks/gifts";
import { useState, useCallback, useEffect } from "react";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import InputFileUpload from "@/components/InputFileUpload";
import Button from "@/components/Button";
import { CurrencyMask } from "@/utils/masks";
import InputTextArea from "@/components/InputTextArea";
import { formatCurrency } from "@/utils/formatString";
import { useCategories } from "@/hooks/categories";

interface GiftFormProps {
  giftListId: string;
  userId: string;
  isEdit?: boolean;
  initialValues?: GiftUpdateFormData;
  onSuccess?: () => void;
  onClose: () => void;
}

const PRIORITIES = [
  { value: "LOW", text: "Baixa" },
  { value: "MEDIUM", text: "Média" },
  { value: "HIGH", text: "Alta" },
];

export const GiftForm = ({
  giftListId,
  userId,
  isEdit = false,
  initialValues,
  onSuccess,
  onClose,
}: GiftFormProps) => {
  const [giftPhoto, setGiftPhoto] = useState<File | null>(null);
  const [allInitialData, setAllInitialData] = useState<GiftUpdateFormData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { data: CATEGORIES, isLoading: isLoadingCategories } = useCategories();

  const methods = useForm<GiftFormData>({
    resolver: zodResolver(giftSchema),
    defaultValues: isEdit ? initialValues : {
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

  const { register, handleSubmit, setValue, clearErrors, reset, watch, formState: { errors, isSubmitted } } = methods;
  const { mutate: createGiftMutation, isLoading: isCreating } = useCreateGift();
  const { mutate: updateGiftMutation, isLoading: isUpdating } = useUpdateGift();
  const isLoading = isCreating;

  useEffect(() => {
    if (isEdit && initialValues) {
      reset({
        ...initialValues,
        totalValue: formatCurrency(initialValues.totalValue || 0),
      });
      setAllInitialData(initialValues);
    }
  }, [isEdit, initialValues, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (isEdit && allInitialData && name) {
        const hasChanges = Object.keys(value).some(
          (key) => value[key as keyof GiftFormData] !== allInitialData[key as keyof GiftFormData]
        );
        setHasChanges(hasChanges);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, allInitialData, isEdit]); // Adicionamos isEdit como dependência

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
    if (!giftPhoto && !isEdit) {
      alert("Por favor, adicione uma foto do presente.");
      return;
    }

    if (isEdit && !allInitialData) return;

    // Compara os valores atuais com os iniciais apenas se isEdit for true
    const updatedData: Partial<GiftFormData> = {};
    if (isEdit) {
      Object.keys(data).forEach((key) => {
        const field = key as keyof GiftFormData;
        if (data[field] !== allInitialData![field]) {
          updatedData[field] = data[field];
        }
      });

      if (Object.keys(updatedData).length === 0) {
        return;
      }
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
      if (isEdit) {
        if (!initialValues?.id) {
          console.error("ID do presente não encontrado.");
          return;
        }

        updateGiftMutation(
          {
            giftListId,
            giftId: initialValues.id,
            data: {
              ...updatedData,
              userId,
              giftListId,
              totalValue: Number(data.totalValue),
            },
          },
          {
            onSuccess: () => {
              onSuccess?.();
              onClose();
            },
            onError: (error) => {
              console.error("Erro ao atualizar presente:", error);
            },
          }
        );
      } else {
        createGiftMutation(dataToSend, {
          onSuccess: () => {
            onSuccess?.();
            onClose();
          },
          onError: (error) => {
            console.error("Erro ao adicionar presente:", error);
          },
        });
      }
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          inputValue={formatCurrency(watch("totalValue") || 0)}
          register={register("totalValue", {
            required: "O valor é obrigatório",
            setValueAs: (value) => {
              if (typeof value === "string") {
                const numericValue = Number(value.replace(/\D/g, "")) / 100;
                return isNaN(numericValue) || numericValue === 0 ? undefined : numericValue;
              }
              return value;
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
            options={CATEGORIES ? CATEGORIES.map((cat) => cat.name) : []}
            values={CATEGORIES ? CATEGORIES.map((cat) => cat.id) : []}
            register={{ ...register("categoryId", { required: "Categoria é obrigatória" }) }}
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
            initialFile={initialValues?.giftPhoto}
          />
          {errors.giftPhoto?.message && (
            <span className="text-red-500 text-sm mt-1">
              {errors.giftPhoto.message}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mt-6">
          <Button
            variant="outlined-danger"
            widthFull
            onClick={onClose}
            aria-label="Cancelar"
            disabled={isLoading || isUpdating}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            widthFull
            aria-label={isEdit ? "Salvar alterações" : "Adicionar presente"}
            loading={isLoading || isUpdating}
            disabled={isLoading || isUpdating || (isEdit && !hasChanges)} // Desabilita se não houver alterações (apenas no modo de edição)
          >
            {isLoading || isUpdating ? (isEdit ? "Salvando..." : "Adicionando...") : (isEdit ? "Salvar alterações" : "Adicionar presente")}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};