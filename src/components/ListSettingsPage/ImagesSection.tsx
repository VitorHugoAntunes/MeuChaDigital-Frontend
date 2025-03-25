import { useFormContext } from "react-hook-form";
import { ListSettingsFormData } from "@/schemas/listSettingsSchema";
import InputFileUpload from "@/components/InputFileUpload";
import InputMultiFileUpload from "@/components/InputMultiFileUpload";
import Card from "@/components/Card";

interface ImagesSectionProps {
  initialBanner?: File | null;
  initialMomentImages?: File[];
  errors: {
    banner?: { message: string };
    momentImages?: { message: string };
  };
}

export default function ImagesSection({ initialBanner, initialMomentImages, errors }: ImagesSectionProps) {
  const { setValue, trigger } = useFormContext<ListSettingsFormData>();

  return (
    <section id="imagens">
      <Card>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Imagens</h2>
        <div className="space-y-4">
          <div className="mb-6">
            <InputFileUpload
              label="Capa da Lista"
              onFileSelect={(file) => file && setValue("banner", file)}
              trigger={() => trigger("banner")}
              initialFile={initialBanner || null}
            />
            {errors.banner && <span className="text-danger text-sm mt-1">{errors.banner.message}</span>}
          </div>
          <div className="mb-6">
            <InputMultiFileUpload
              label="Imagens de Momentos"
              onFilesSelect={(files) => setValue("momentImages", files)}
              trigger={() => trigger("momentImages")}
              initialFiles={initialMomentImages || []}
            />
            {errors.momentImages && <span className="text-danger text-sm mt-1">{errors.momentImages.message}</span>}
          </div>
        </div>
      </Card>
    </section>
  );
}