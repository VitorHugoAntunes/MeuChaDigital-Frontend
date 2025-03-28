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
import AddressSection from "@/components/ListSettingsPage/AddressSection";
import Card from "@/components/Card";

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

  console.log('LIST DATA', listData)

  const [initialBanner, setInitialBanner] = useState<File | null>(null);
  const [initialMomentImages, setInitialMomentImages] = useState<File[]>([]);
  const [allInitialData, setAllInitialData] = useState<Record<string, any>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const [formInitialized, setFormInitialized] = useState(false);

  const methods = useForm<ListSettingsFormData>({
    resolver: zodResolver(listSettingsSchema),
    defaultValues: {
      listName: listData?.data.name || "",
      listDescription: listData?.data.description || "",
      eventDate: listData?.data.eventDate ? new Date(listData.data.eventDate).toISOString().split("T")[0] : "",
      eventTime: listData?.data.eventTime || "",
      eventType: listData?.data.type || "WEDDING",
      listSlug: listData?.data.slug || "",
      listStatus: listData?.data.status || "ACTIVE",
      address: {
        zipCode: listData?.data.address?.zipCode || "",
        streetAddress: listData?.data.address?.streetAddress || "",
        streetNumber: listData?.data.address?.streetNumber || "",
        addressLine2: listData?.data.address?.addressLine2 || "",
        neighborhood: listData?.data.address?.neighborhood || "",
        city: listData?.data.address?.city || "",
        state: listData?.data.address?.state || "",
      },
    },
  });

  const { handleSubmit, setValue, formState: { errors } } = methods;

  const updateFormValues = useCallback(() => {
    if (listData && !formInitialized) {
      setValue("listName", listData.data.name);
      setValue("listDescription", listData.data.description);
      setValue("eventDate", listData.data.eventDate ? new Date(listData.data.eventDate).toISOString().split("T")[0] : "");
      setValue("eventTime", listData.data.eventTime || "");
      setValue("eventType", listData.data.type || "WEDDING");
      setValue("listSlug", listData.data.slug || "");
      setValue("listStatus", listData.data.status || "ACTIVE");
      setValue("address.zipCode", listData.data.address?.zipCode || "");
      setValue("address.streetAddress", listData.data.address?.streetAddress || "");
      setValue("address.streetNumber", listData.data.address?.streetNumber || "");
      setValue("address.addressLine2", listData.data.address?.addressLine2 || "");
      setValue("address.neighborhood", listData.data.address?.neighborhood || "");
      setValue("address.city", listData.data.address?.city || "");
      setValue("address.state", listData.data.address?.state || "");

      if (listData.data.banner) {
        fetch(listData.data.banner.url)
          .then((response) => response.blob())
          .then((blob) => {
            const file = new File([blob], "banner.jpeg", { type: blob.type });
            setInitialBanner(file);
            setAllInitialData((prevState) => ({ ...prevState, banner: file }));
          });
      }

      if (listData.data.momentsImages?.length > 0) {
        const momentFiles = listData.data.momentsImages.map((image, index) =>
          fetch(image.url)
            .then((response) => response.blob())
            .then((blob) => new File([blob], `momentImage${index}.jpeg`, { type: blob.type }))
        );

        Promise.all(momentFiles).then((files) => {
          setInitialMomentImages(files);
          setAllInitialData((prevState) => ({ ...prevState, momentsImages: listData.data.momentsImages }));
        });
      }

      setAllInitialData((prevState) => ({
        ...prevState,
        listName: listData.data.name,
        listDescription: listData.data.description,
        eventDate: listData.data.eventDate && new Date(listData.data.eventDate).toISOString().split("T")[0],
        eventTime: listData.data.eventTime,
        eventType: listData.data.type,
        listSlug: listData.data.slug,
        listStatus: listData.data.status,
        address: {
          zipCode: listData.data.address?.zipCode,
          streetAddress: listData.data.address?.streetAddress,
          streetNumber: listData.data.address?.streetNumber,
          addressLine2: listData.data.address?.addressLine2,
          neighborhood: listData.data.address?.neighborhood,
          city: listData.data.address?.city,
          state: listData.data.address?.state,
        },
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
        value.eventTime !== allInitialData.eventTime ||
        value.eventType !== allInitialData.eventType ||
        value.listSlug !== allInitialData.listSlug ||
        value.listStatus !== allInitialData.listStatus ||
        value.address?.zipCode !== allInitialData.address.zipCode ||
        value.address?.streetAddress !== allInitialData.address.streetAddress ||
        value.address?.streetNumber !== allInitialData.address.streetNumber ||
        value.address?.addressLine2 !== allInitialData.address.addressLine2 ||
        value.address?.neighborhood !== allInitialData.address.neighborhood ||
        value.address?.city !== allInitialData.address.city ||
        value.address?.state !== allInitialData.address.state ||
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
    if (data.eventTime !== allInitialData.eventTime) updatedData.eventTime = data.eventTime;
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

    if (data.address.zipCode !== allInitialData.address.zipCode) updatedData.address = { ...updatedData.address, zipCode: data.address.zipCode };
    if (data.address.streetAddress !== allInitialData.address.streetAddress) updatedData.address = { ...updatedData.address, streetAddress: data.address.streetAddress };
    if (data.address.streetNumber !== allInitialData.address.streetNumber) updatedData.address = { ...updatedData.address, streetNumber: data.address.streetNumber };
    if (data.address.addressLine2 !== allInitialData.address.addressLine2) updatedData.address = { ...updatedData.address, addressLine2: data.address.addressLine2 };
    if (data.address.neighborhood !== allInitialData.address.neighborhood) updatedData.address = { ...updatedData.address, neighborhood: data.address.neighborhood };
    if (data.address.city !== allInitialData.address.city) updatedData.address = { ...updatedData.address, city: data.address.city };
    if (data.address.state !== allInitialData.address.state) updatedData.address = { ...updatedData.address, state: data.address.state };

    if (Object.keys(updatedData).length === 0) {
      console.log("Nenhuma alteração detectada.");
      return;
    }

    console.log("Dados antigos:", allInitialData);
    console.log("Dados novos:", updatedData);

    updateGiftListMutation({
      userId: listData.data.userId,
      giftListId: listData.data.id,
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
          eventTime: data.eventTime,
          eventType: data.eventType,
          listSlug: data.listSlug,
          listStatus: data.listStatus,
          banner: data.banner || prevState.banner,
          momentsImages: data.momentImages || prevState.momentsImages,
          address: {
            zipCode: data.address.zipCode,
            streetAddress: data.address.streetAddress,
            streetNumber: data.address.streetNumber,
            addressLine2: data.address.addressLine2,
            neighborhood: data.address.neighborhood,
            city: data.address.city,
            state: data.address.state,
          },
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
      giftListId: listData.data.id,
      slug: listData.data.slug,
    }, {
      onSuccess: () => {
        setIsListDeleted(true);
        navigation.push("/lists");
        setIsModalOpen(false);
      }

    });
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:mt-8 lg:mb-36 py-6 h-fit relative">
      <MenuAside type="settings" />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 lg:gap-8">
          <header>
            <h1 className="text-3xl font-bold text-text-primary">Configurações da Lista</h1>
          </header>

          <BasicInfoSection methods={methods} errors={errors} typeValue={listData.data.eventType} />
          <AddressSection errors={errors} />
          <ImagesSection initialBanner={initialBanner} initialMomentImages={initialMomentImages} errors={errors} />
          <PrivacySection errors={errors} />
          <DangerZoneSection listStatus={listData.data.status} isLoading={isUpdating} onDeleteList={handleOpenModal} />

          <Card className="sticky bottom-0 left-0 right-0 z-10 rounded-none sm:rounded -mx-4 sm:mx-0">
            <div>
              <div className="flex justify-end gap-4 sm:px-0">
                <div className="w-full sm:w-auto">
                  <Button
                    variant="outlined-danger"
                    type="button"
                    onClick={handleRedirect}
                    disabled={isUpdating}
                    widthFull
                  >
                    Cancelar
                  </Button>
                </div>

                <div className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    disabled={isUpdating || !hasChanges}
                    loading={isUpdating}
                    widthFull
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
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
