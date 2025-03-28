import { useFormContext } from "react-hook-form";
import { ListSettingsFormData } from "@/schemas/listSettingsSchema";
import InputField from "@/components/InputField";
import InputSelect from "@/components/InputSelect";
import Card from "@/components/Card";

interface PrivacySectionProps {
  errors: any;
}

export default function PrivacySection({ errors }: PrivacySectionProps) {
  const { register } = useFormContext<ListSettingsFormData>();

  return (
    <section id="privacidade">
      <Card>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Privacidade</h2>
        <div className="space-y-4">
          <InputField
            label="Slug da Lista"
            placeholder="exemplo: casamento-do-joao-e-maria"
            register={{ ...register("listSlug", { required: "Slug da lista é obrigatório" }) }}
            error={errors.listSlug?.message}
          />
          <InputSelect
            label="Status da Lista"
            register={{ ...register("listStatus", { required: "Status da lista é obrigatório" }) }}
            options={["Ativa", "Inativa"]}
            values={["ACTIVE", "INACTIVE"]}
            error={errors.listStatus?.message}
          />
        </div>
      </Card>
    </section>
  );
}