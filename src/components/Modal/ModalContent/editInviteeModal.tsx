"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import InputTextArea from "@/components/InputTextArea";
import { UpdateInviteeFormData, updateInviteeSchema } from "@/schemas/createInviteeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PhoneMask } from "@/utils/masks";
import { useUpdateInvitee } from "@/hooks/invitee";

interface EditInviteeFormProps {
  slug: string;
  initialValues?: UpdateInviteeFormData;
  onSuccess?: () => void;
  onClose: () => void;
}

export const EditInviteeModal = ({ slug, initialValues, onSuccess, onClose }: EditInviteeFormProps) => {
  const STATUS = [
    { value: "REJECTED", text: "Recusado" },
    { value: "ACCEPTED", text: "Aceito" },
  ];

  const [allInitialData, setAllInitialData] = useState<UpdateInviteeFormData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  console.log("initialValues", initialValues);

  const { mutateAsync, isLoading } = useUpdateInvitee();

  const methods = useForm<UpdateInviteeFormData>({
    resolver: zodResolver(updateInviteeSchema),
    defaultValues: {
      name: initialValues?.name || "",
      phone: initialValues?.phone || "",
      email: initialValues?.email || "",
      additionalInvitees: initialValues?.additionalInvitees || 0,
      observation: initialValues?.observation === "-" ? "" : initialValues?.observation || "",
      giftListId: initialValues?.giftListId || "",
      status: initialValues?.status || "ACCEPTED",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (initialValues) {

      const formattedPhone = PhoneMask(initialValues.phone || "");
      reset({
        ...initialValues,
        phone: formattedPhone,
        observation: initialValues.observation === "-" ? "" : initialValues.observation,
      });
      setAllInitialData({
        ...initialValues,
        phone: formattedPhone,
      });
    }
  }, [initialValues, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (allInitialData && name) {
        const hasChanges = Object.keys(value).some(
          (key) => value[key as keyof UpdateInviteeFormData] !== allInitialData[key as keyof UpdateInviteeFormData]
        );
        setHasChanges(hasChanges);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, allInitialData]);

  function removeMask(value: string) {
    return value.replace(/[^0-9]/g, "");
  }

  function onSubmit(data: UpdateInviteeFormData) {
    if (!hasChanges) {
      console.log("Nenhuma alteração detectada.");
      return;
    }

    const dataToSend = {
      ...data,
      phone: removeMask(data.phone),
      observation: data.observation || "-",
    };

    console.log("Dados enviados:", dataToSend);

    mutateAsync({
      slug,
      id: initialValues?.id as string,
      data: dataToSend,
    }).then(() => {
      onSuccess?.();
      onClose();
    });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Nome"
          placeholder="Digite seu nome"
          register={{ ...register("name", { required: "Nome é obrigatório" }) }}
          error={errors.name?.message}
        />

        <InputField
          label="E-mail"
          placeholder="Digite seu e-mail"
          register={{ ...register("email", { required: "E-mail é obrigatório" }) }}
          error={errors.email?.message}
        />

        <InputField
          label="Telefone"
          placeholder="Digite seu telefone"
          register={{ ...register("phone", { required: "Telefone é obrigatório" }) }}
          inputValue={watch("phone")}
          mask={PhoneMask}
          error={errors.phone?.message}
        />

        <InputField
          type="number"
          step={1}
          min={0}
          max={5}
          label="Convidados adicionais"
          placeholder="Quantas pessoas você levará?"
          register={{ ...register("additionalInvitees", { required: "Número de convidados é obrigatório", valueAsNumber: true }) }}
          error={errors.additionalInvitees?.message}
          isNumeric
        />

        <InputTextArea
          label="Observações"
          placeholder="Restrições alimentares, dúvidas, avisos, etc."
          register={{ ...register("observation") }}
          error={errors.observation?.message}
        />

        <InputSelect
          label="Status"
          options={STATUS.map((status) => status.text)}
          values={STATUS.map((status) => status.value)}
          register={{ ...register("status", { required: "Categoria é obrigatória" }) }}
          error={errors.status?.message}
        />

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            variant="outlined-danger"
            widthFull
            type="button"
            disabled={isLoading}
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            widthFull
            type="submit"
            disabled={!hasChanges || isLoading}
            loading={isLoading}
          >
            Salvar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};