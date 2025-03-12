"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listSettingsSchema, ListSettingsFormData } from "@/schemas/listSettingsSchema";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Button from "@/components/Button";
import MenuAside from "@/components/ListSettingsPage/MenuAside";
import BasicInfoSection from "@/components/ListSettingsPage/BasicInfoSection";
import ImagesSection from "@/components/ListSettingsPage/ImagesSection";
import PrivacySection from "@/components/ListSettingsPage/PrivacySection";
import DangerZoneSection from "@/components/ListSettingsPage/DangerZoneSection";
import { useGiftListBySlug } from "@/hooks/giftLists";

export default function ListSettingsPage() {
  const slug = useParams().list as string;
  const { data: listData, isFetching, error } = useGiftListBySlug(slug as string);

  const [initialBanner, setInitialBanner] = useState<File | null>(null);
  const [initialMomentImages, setInitialMomentImages] = useState<File[]>([]);

  const [formInitialized, setFormInitialized] = useState(false);

  const methods = useForm<ListSettingsFormData>({
    resolver: zodResolver(listSettingsSchema),
    defaultValues: {
      listName: "",
      listDescription: "",
      eventDate: "",
      eventType: "WEDDING",
      listSlug: "",
      listStatus: "ACTIVE",
    },
  });

  const { handleSubmit, setValue, formState: { errors } } = methods;

  const updateFormValues = useCallback(() => {
    if (listData && !formInitialized) {
      setValue("listName", listData.name);
      setValue("listDescription", listData.description);
      setValue("eventDate", listData.eventDate ? new Date(listData.eventDate).toISOString().split("T")[0] : "");
      setValue("eventType", listData.type || "WEDDING");
      setValue("listSlug", listData.slug || "");
      setValue("listStatus", listData.status || "ACTIVE");

      if (listData.banner) {
        fetch(listData.banner.url)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], "banner.jpeg", { type: blob.type });
            setInitialBanner(file);
          });
      }

      if (listData.momentsImages?.length > 0) {
        const momentFiles = listData.momentsImages.map((image, index) =>
          fetch(image.url)
            .then((response) => response.blob())
            .then((blob) => new File([blob], `momentImage${index}.jpeg`, { type: blob.type }))
        );

        Promise.all(momentFiles).then((files) => setInitialMomentImages(files));
      }

      setFormInitialized(true);
    }
  }, [listData, formInitialized, setValue]);

  useEffect(() => {
    if (listData && !formInitialized) {
      updateFormValues();
    }
  }, [listData, formInitialized]);

  const onSubmit: SubmitHandler<ListSettingsFormData> = (data) => {
    console.log("Dados do formulário:", data);
  };

  if (isFetching) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados da lista.</div>;

  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mt-8 mb-36 py-6 px-4 md:px-8 h-fit">
      <MenuAside />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <header>
            <h1 className="text-3xl font-bold text-text-primary">Configurações da Lista</h1>
          </header>

          <BasicInfoSection errors={errors} typeValue={listData.eventType} />
          <ImagesSection initialBanner={initialBanner} initialMomentImages={initialMomentImages} errors={errors} />
          <PrivacySection errors={errors} />
          <DangerZoneSection onDeleteList={() => console.log("Lista deletada")} />

          <footer className="flex justify-end gap-4">
            <Button variant="outlined" type="button" onClick={() => console.log("Cancelar")}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </footer>
        </form>
      </FormProvider>

      <ToastContainer />
    </main>
  );
}