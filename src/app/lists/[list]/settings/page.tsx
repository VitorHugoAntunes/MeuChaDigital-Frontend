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
  interface InitialData {
    listName: string;
    listDescription: string;
    eventDate: string | null;
    eventTime: string;
    eventType: string;
    listSlug: string;
    listStatus: string;
    banner?: File | null;
    momentsImages?: File[];
    address: {
      zipCode: string;
      streetAddress: string;
      streetNumber: string;
      addressLine2?: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  }

  const [allInitialData, setAllInitialData] = useState<InitialData>({
    listName: "",
    listDescription: "",
    eventDate: null,
    eventTime: "",
    eventType: "WEDDING",
    listSlug: "",
    listStatus: "ACTIVE",
    address: {
      zipCode: "",
      streetAddress: "",
      streetNumber: "",
      addressLine2: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });
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
        interface MomentImage {
          url: string;
        }

        const momentFiles: Promise<File>[] = listData.data.momentsImages.map((image: MomentImage, index: number) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listData, formInitialized]);

  const updatedData: Partial<ListSettingsFormData & { banner?: File; moments_images?: File[] }> = {};

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
              (file, index) => file && (!initialMomentImages[index] || file.name !== initialMomentImages[index].name)
            ))
        );

      setHasChanges(hasChanged ?? false);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.watch, allInitialData, initialBanner, initialMomentImages]);

  const onSubmit: SubmitHandler<ListSettingsFormData> = (data) => {
    if (!allInitialData) return;

    if (data.listName !== allInitialData.listName) updatedData.listName = data.listName;
    if (data.listDescription !== allInitialData.listDescription) updatedData.listDescription = data.listDescription;
    if (data.eventDate !== allInitialData.eventDate) updatedData.eventDate = data.eventDate;
    if (data.eventTime !== allInitialData.eventTime) updatedData.eventTime = data.eventTime;
    if (data.eventType !== allInitialData.eventType) updatedData.eventType = data.eventType;
    if (data.listSlug !== allInitialData.listSlug) updatedData.listSlug = data.listSlug;
    if (data.listStatus !== allInitialData.listStatus) updatedData.listStatus = data.listStatus;

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

    if (data.address.zipCode !== allInitialData.address.zipCode) updatedData.address = { ...updatedData.address, zipCode: data.address.zipCode, streetAddress: data.address.streetAddress || "", streetNumber: data.address.streetNumber || "", neighborhood: data.address.neighborhood || "", city: data.address.city || "", state: data.address.state || "", addressLine2: data.address.addressLine2 || "" };
    if (data.address.streetAddress !== allInitialData.address.streetAddress) updatedData.address = { ...updatedData.address, zipCode: updatedData.address?.zipCode || "", streetAddress: data.address.streetAddress || "", streetNumber: updatedData.address?.streetNumber || "", neighborhood: updatedData.address?.neighborhood || "", city: updatedData.address?.city || "", state: updatedData.address?.state || "", addressLine2: updatedData.address?.addressLine2 || "" };
    if (data.address.streetNumber !== allInitialData.address.streetNumber) updatedData.address = { ...updatedData.address, zipCode: updatedData.address?.zipCode || "", streetAddress: updatedData.address?.streetAddress || "", streetNumber: data.address.streetNumber || "", neighborhood: updatedData.address?.neighborhood || "", city: updatedData.address?.city || "", state: updatedData.address?.state || "", addressLine2: updatedData.address?.addressLine2 || "" };
    if (data.address.addressLine2 !== allInitialData.address.addressLine2) updatedData.address = { ...updatedData.address, zipCode: updatedData.address?.zipCode || "", streetAddress: updatedData.address?.streetAddress || "", streetNumber: updatedData.address?.streetNumber || "", neighborhood: updatedData.address?.neighborhood || "", city: updatedData.address?.city || "", state: updatedData.address?.state || "", addressLine2: data.address.addressLine2 || "" };
    if (data.address.neighborhood !== allInitialData.address.neighborhood) updatedData.address = { ...updatedData.address, zipCode: updatedData.address?.zipCode || "", streetAddress: updatedData.address?.streetAddress || "", streetNumber: updatedData.address?.streetNumber || "", addressLine2: updatedData.address?.addressLine2 || "", neighborhood: data.address.neighborhood || "", city: updatedData.address?.city || "", state: updatedData.address?.state || "" };
    if (data.address.city !== allInitialData.address.city) updatedData.address = { ...updatedData.address, zipCode: updatedData.address?.zipCode || "", streetAddress: updatedData.address?.streetAddress || "", streetNumber: updatedData.address?.streetNumber || "", neighborhood: updatedData.address?.neighborhood || "", state: updatedData.address?.state || "", addressLine2: updatedData.address?.addressLine2 || "", city: data.address.city || "" };
    if (data.address.state !== allInitialData.address.state) updatedData.address = {
      ...updatedData.address,
      zipCode: updatedData.address?.zipCode || "",
      streetAddress: updatedData.address?.streetAddress || "",
      streetNumber: updatedData.address?.streetNumber || "",
      neighborhood: updatedData.address?.neighborhood || "",
      city: updatedData.address?.city || "",
      addressLine2: updatedData.address?.addressLine2 || "",
      state: data.address.state || ""
    };

    if (Object.keys(updatedData).length === 0) {
      console.log("Nenhuma alteração detectada.");
      return;
    }

    console.log("Dados antigos:", allInitialData);
    console.log("Dados novos:", updatedData);

    updateGiftListMutation({
      userId: listData.data.userId,
      giftListId: listData.data.id,
      address: {
        ...allInitialData.address,
        addressLine2: data.address.addressLine2 as string,
      },
      name: updatedData.listName,
      description: updatedData.listDescription,
      eventDate: updatedData.eventDate,
      eventTime: updatedData.eventTime,
      type: updatedData.eventType,
      slug: updatedData.listSlug,
      status: updatedData.listStatus,
      banner: updatedData.banner,
      moments_images: updatedData.moments_images,
      eventType: updatedData.eventType,
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
            addressLine2: data.address.addressLine2 || "", // Definindo um valor padrão caso seja undefined
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
      <MenuAside />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 lg:gap-8">
          <header>
            <h1 className="text-3xl font-bold text-text-primary">Configurações da Lista</h1>
          </header>

          <BasicInfoSection methods={methods} errors={Object.fromEntries(
            Object.entries(errors).map(([key, value]) => [
              key,
              value ? { message: value.message || '' } : undefined
            ])
          )} typeValue={listData.data.eventType} />
          <AddressSection errors={errors} />
          <ImagesSection initialBanner={initialBanner} initialMomentImages={initialMomentImages} errors={{
            banner: errors.banner ? { message: errors.banner.message || '' } : undefined,
            momentImages: errors.momentImages ? { message: errors.momentImages.message || '' } : undefined
          }} />
          <PrivacySection errors={{
            listSlug: errors.listSlug ? { message: errors.listSlug.message || '' } : undefined,
            listStatus: errors.listStatus ? { message: errors.listStatus.message || '' } : undefined
          }} />
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
