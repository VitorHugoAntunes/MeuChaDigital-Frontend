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
import { useDeleteGiftList, useGiftListBySlug, useUpdateGiftList } from "@/hooks/giftLists";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";

export default function ListSettingsPage() {
  const slug = useParams().list as string;
  const [isListDeleted, setIsListDeleted] = useState(false);
  const { data: listData, isLoading: isFetching, error, refetch } = useGiftListBySlug(slug as string, {
    enabled: !!slug && !isListDeleted,
  });
  const { mutate: updateGiftListMutation, isLoading: isUpdating } = useUpdateGiftList(listData?.id);
  const { mutate: deleteGiftListMutation, isLoading: isDeleting } = useDeleteGiftList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigation = useRouter();

  const [initialBanner, setInitialBanner] = useState<File | null>(null);
  const [initialMomentImages, setInitialMomentImages] = useState<File[]>([]);
  const [allInitialData, setAllInitialData] = useState<Record<string, any>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const [formInitialized, setFormInitialized] = useState(false);

  const methods = useForm<ListSettingsFormData>({
    resolver: zodResolver(listSettingsSchema),
    defaultValues: {
      listName: listData?.name || "",
      listDescription: listData?.description || "",
      eventDate: listData?.eventDate ? new Date(listData.eventDate).toISOString().split("T")[0] : "",
      eventType: listData?.type || "WEDDING",
      listSlug: listData?.slug || "",
      listStatus: listData?.status || "ACTIVE",
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
            setAllInitialData((prevState) => ({ ...prevState, banner: file }));
          });
      }

      if (listData.momentsImages?.length > 0) {
        const momentFiles = listData.momentsImages.map((image, index) =>
          fetch(image.url)
            .then((response) => response.blob())
            .then((blob) => new File([blob], `momentImage${index}.jpeg`, { type: blob.type }))
        );

        Promise.all(momentFiles).then((files) => {
          setInitialMomentImages(files);
          setAllInitialData((prevState) => ({ ...prevState, momentsImages: listData.momentsImages }));
        });
      }

      setAllInitialData((prevState) => ({
        ...prevState,
        listName: listData.name,
        listDescription: listData.description,
        eventDate: listData.eventDate && new Date(listData.eventDate).toISOString().split("T")[0],
        eventType: listData.type,
        listSlug: listData.slug,
        listStatus: listData.status,
      }));

      setFormInitialized(true);
    }
  }, [listData, formInitialized, setValue]);

  useEffect(() => {
    if (listData && !formInitialized) {
      updateFormValues();
    }
  }, [listData, formInitialized]);

  const updatedData: Record<string, any> = {};

  useEffect(() => {
    const subscription = methods.watch((value) => {
      const hasChanged =
        value.listName !== allInitialData.listName ||
        value.listDescription !== allInitialData.listDescription ||
        value.eventDate !== allInitialData.eventDate ||
        value.eventType !== allInitialData.eventType ||
        value.listSlug !== allInitialData.listSlug ||
        value.listStatus !== allInitialData.listStatus ||
        (value.banner && value.banner !== initialBanner) ||
        (value.momentImages &&
          (value.momentImages.length !== initialMomentImages.length ||
            value.momentImages.some(
              (file, index) => !initialMomentImages[index] || file.name !== initialMomentImages[index].name
            ))
        );

      setHasChanges(hasChanged ?? false);
    });

    return () => subscription.unsubscribe();
  }, [methods.watch, allInitialData, initialBanner, initialMomentImages]);


  const onSubmit: SubmitHandler<ListSettingsFormData> = (data) => {
    if (!allInitialData) return;


    if (data.listName !== allInitialData.listName) updatedData.name = data.listName;
    if (data.listDescription !== allInitialData.listDescription) updatedData.description = data.listDescription;
    if (data.eventDate !== allInitialData.eventDate) updatedData.eventDate = data.eventDate;
    if (data.eventType !== allInitialData.eventType) updatedData.type = data.eventType;
    if (data.listSlug !== allInitialData.listSlug) updatedData.slug = data.listSlug;
    if (data.listStatus !== allInitialData.listStatus) updatedData.status = data.listStatus;

    // Comparação de arquivos (banner)
    if (data.banner && data.banner !== initialBanner) {
      updatedData.banner = data.banner;
    }

    if (data.momentImages) {
      const hasChanged =
        data.momentImages.length !== initialMomentImages.length ||
        data.momentImages.some(
          (file, index) => !initialMomentImages[index] || file.name !== initialMomentImages[index].name
        );

      if (hasChanged) {
        updatedData.moments_images = data.momentImages;
      }
    }

    if (Object.keys(updatedData).length === 0) {
      console.log("Nenhuma alteração detectada.");
      return;
    }

    console.log("Dados antigos:", allInitialData);
    console.log("Dados novos:", updatedData);

    updateGiftListMutation({
      userId: listData.userId,
      giftListId: listData.id,
      ...updatedData,
    }, {
      onSuccess: () => {
        refetch();
        updateFormValues();

        setAllInitialData((prevState) => ({
          ...prevState,
          listName: data.listName,
          listDescription: data.listDescription,
          eventDate: data.eventDate,
          eventType: data.eventType,
          listSlug: data.listSlug,
          listStatus: data.listStatus,
          banner: data.banner || prevState.banner,
          momentsImages: data.momentImages || prevState.momentsImages,
        }));
      },
    });

  };

  if (isFetching) return <LoadingSpinner />;
  if (error) return <div>Erro ao carregar os dados da lista.</div>;

  function handleRedirect() {
    navigation.push(`/lists/${slug}/gifts`);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleDeleteList() {
    deleteGiftListMutation({
      giftListId: listData.id,
      slug: listData.slug,
    }, {
      onSuccess: () => {
        setIsListDeleted(true);
        navigation.push("/lists");
        setIsModalOpen(false);
      }

    });
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mt-8 mb-36 py-6 h-fit">
      <MenuAside />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <header>
            <h1 className="text-3xl font-bold text-text-primary">Configurações da Lista</h1>
          </header>

          <BasicInfoSection methods={methods} errors={errors} typeValue={listData.eventType} />
          <ImagesSection initialBanner={initialBanner} initialMomentImages={initialMomentImages} errors={errors} />
          <PrivacySection methods={methods} errors={errors} />
          <DangerZoneSection listStatus={listData.status} isLoading={isUpdating} onDeleteList={handleOpenModal} />

          <footer className="flex justify-end gap-4">
            <Button
              variant="outlined-danger"
              type="button"
              onClick={handleRedirect}
              disabled={isUpdating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUpdating || !hasChanges}
              loading={isUpdating}
            >
              Salvar
            </Button>
          </footer>
        </form>
      </FormProvider>

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalType="action"
        action="Excluir"
        actionTitle="Excluir Lista"
        actionDescription="Você tem certeza que deseja excluir esta lista? Esta ação é irreversível."
        isLoading={isDeleting}
        onSuccess={handleDeleteList}
      />

      <ToastContainer />
    </main>
  );
}
