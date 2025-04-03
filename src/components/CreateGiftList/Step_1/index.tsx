"use client";

import EventTypeOption from "@/components/EventTypeOption";
import InputField from "@/components/InputField";
import InputTextArea from "@/components/InputTextArea";
import { useFormContext } from 'react-hook-form';

export default function Step1() {
  const { register, watch, setValue, trigger, formState: { errors } } = useFormContext();

  const selectedEventType = watch("type");

  const handleInputChange = async (field: string, value: string) => {
    setValue(field, value, { shouldValidate: true });
    await trigger(field);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col mb-6">
        <label className="block text-sm font-bold text-gray-700 dark:text-text-secondary">Tipo do evento</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
          {["Casamento", "Aniversário", "Chá de bebê"].map((label, index) => {
            const value = ["WEDDING", "BIRTHDAY", "BABY_SHOWER"][index];
            return (
              <EventTypeOption
                key={value}
                label={label}
                value={value}
                selected={selectedEventType}
                onSelect={(value) => {
                  setValue("type", value, { shouldValidate: true }); // Atualiza o valor e valida o campo
                  trigger("type");
                }}
              />
            );
          })}
        </div>
        {errors.type?.message && (
          <span className="text-danger text-sm mt-1">{errors.type.message.toString()}</span>
        )}
      </div>

      <InputField
        label="Nome do evento"
        placeholder="Digite o nome do evento"
        register={
          {
            ...register("name", {
              required: "Nome do evento é obrigatório",
            })
          }
        }
        error={errors.name?.message ? errors.name.message.toString() : ""}
      />

      <InputField
        label="Slug do evento"
        description="O slug é utilizado para criar o link do evento, por exemplo, o slug 'Meu Evento' resultará no link 'meu-evento.meuchadigital.com'."
        placeholder="Digite o slug do evento"
        register={
          {
            ...register("slug", {
              required: "Nome do evento é obrigatório",
            })
          }
        }
        error={errors.slug?.message ? errors.slug.message.toString() : ""}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Horário do evento"
          type="time"
          register={
            {
              ...register("time", {
                onChange: (e) => handleInputChange("time", e.target.value),
              })
            }
          }
          error={errors.time?.message ? errors.time.message.toString() : ""}
        />

        <InputField
          label="Data do evento"
          type="date"
          register={
            {
              ...register("date", {
                onChange: (e) => handleInputChange("date", e.target.value),
              })
            }
          }
          error={errors.date?.message ? errors.date.message.toString() : ""}
        />
      </div>

      <InputTextArea
        label="Descrição"
        placeholder="Descreva o evento"
        register={
          {
            ...register("description", {
              required: "Descrição do evento é obrigatória",
            })
          }
        }
        error={errors.description?.message ? errors.description.message.toString() : ""}
      />
    </div>
  );
}