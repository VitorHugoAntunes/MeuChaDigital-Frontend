import { useFormContext } from "react-hook-form";
import { ListSettingsFormData } from "@/schemas/listSettingsSchema";
import InputField from "@/components/InputField";
import InputTextArea from "@/components/InputTextArea";
import EventTypeOption from "@/components/EventTypeOption";
import Card from "@/components/Card";

interface BasicInfoSectionProps {
  methods: any;
  errors: any;
  typeValue: string;
}

export default function BasicInfoSection({ methods, errors, typeValue }: BasicInfoSectionProps) {
  const { register, setValue, watch } = useFormContext<ListSettingsFormData>();

  const selectedEventType = watch("eventType");

  return (
    <section id="informacoes-basicas">
      <Card>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Informações Básicas</h2>
        <div className="space-y-4">
          <div className="flex flex-col mb-6">
            <label className="block text-sm font-bold text-gray-700">Tipo do evento</label>
            <div className="grid grid-cols-3 gap-4 mt-1">
              {["Casamento", "Aniversário", "Chá de bebê"].map((label, index) => {
                const value = ["WEDDING", "BIRTHDAY", "BABY_SHOWER"][index];
                return (
                  <EventTypeOption
                    key={value}
                    label={label}
                    value={value}
                    selected={selectedEventType || typeValue}
                    onSelect={(value) => {
                      setValue("eventType", value, { shouldValidate: true });
                    }}
                  />
                );
              })}
            </div>
            {errors.eventType?.message && (
              <span className="text-sm text-red-500">{errors.eventType.message}</span>
            )}
          </div>

          <InputField
            label="Nome da Lista"
            register={{ ...register("listName", { required: "Nome da lista é obrigatório" }) }}
            error={errors.listName?.message}
          />
          <InputTextArea
            label="Descrição da Lista"
            register={{ ...register("listDescription", { required: "Descrição da lista é obrigatória" }) }}
            error={errors.listDescription?.message}
          />
          <InputField
            label="Data do Evento"
            type="date"
            inputValue={methods.getValues("eventDate")}
            register={{ ...register("eventDate", { required: "Data do evento é obrigatória" }) }}
            error={errors.eventDate?.message}
          />
        </div>
      </Card>
    </section>
  );
}