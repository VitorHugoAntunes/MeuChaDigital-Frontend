"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/Card";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import InputTextArea from "@/components/InputTextArea";
import { InviteeFormData, inviteeSchema } from "@/schemas/createInviteeSchema";
import { useCreateInvitee } from "@/hooks/invitee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhoneMask } from "@/utils/masks";
import { useState, useEffect } from "react";
import Modal from "../Modal";
import { Heart } from "lucide-react";

interface InvitationRSVPSectionProps {
  giftListId: string;
}

export default function InvitationRSVPSection({ giftListId }: InvitationRSVPSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"sendConfirmation" | "sendRejection" | null>(null);
  const [submissionType, setSubmissionType] = useState<"ACCEPTED" | "REJECTED" | null>(null);

  // Verificar se já foi submetido
  useEffect(() => {
    const submissionData = localStorage.getItem(`inviteeSubmission_${giftListId}`);
    if (submissionData) {
      const { submitted, type } = JSON.parse(submissionData);
      if (submitted) {
        setSubmissionType(type);
      }
    }
  }, [giftListId]);

  const methods = useForm<InviteeFormData>({
    resolver: zodResolver(inviteeSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      additionalInvitees: 0,
      observation: "",
      giftListId,
      status: "ACCEPTED",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const { mutateAsync, isLoading } = useCreateInvitee();

  watch("status");

  function removeMask(value: string) {
    return value.replace(/\D/g, "");
  }

  const onSubmit: SubmitHandler<InviteeFormData> = async (data) => {
    if (submissionType) {
      toast.warning("Você já respondeu este convite anteriormente");
      return;
    }

    const dataToSend = {
      ...data,
      phone: removeMask(data.phone),
      observation: data.observation || "-",
    };

    await mutateAsync(dataToSend, {
      onSuccess: () => {
        const type = data.status;
        setSubmissionType(type);
        localStorage.setItem(
          `inviteeSubmission_${giftListId}`,
          JSON.stringify({ submitted: true, type })
        );

        toast.success(
          type === "ACCEPTED"
            ? "Presença confirmada com sucesso!"
            : "Recusa registrada com sucesso!",
          {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        reset();
      },
    });
  };

  const handleOpenConfirmationModal = () => {
    setValue("status", "ACCEPTED");
    setModalType("sendConfirmation");
    setIsModalOpen(true);
  };

  const handleOpenRejectionModal = () => {
    setValue("status", "REJECTED");
    setModalType("sendRejection");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    await handleSubmit(onSubmit)();
    setIsModalOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <section id="rsvp" className="my-8 lg:my-16">
        <h2 className="text-center text-2xl sm:text-4xl font-bold text-text-primary mb-8 lg:mb-12">
          Confirme sua presença
        </h2>
        <Card className="max-w-screen-sm w-full mx-auto">
          {submissionType ? (
            <div className="text-center py-8">
              <h3 className={`text-2xl font-bold mb-3 ${submissionType === "ACCEPTED" ? "text-success" : "text-danger"}`}>
                {submissionType === "ACCEPTED" ? "Presença confirmada!" : "Recebemos sua resposta"}
              </h3>

              <p className="text-text-secondary mb-6 mx-auto">
                {submissionType === "ACCEPTED" ? (
                  <>
                    <span className="flex items-center justify-center gap-2">
                      Muito obrigado por confirmar sua presença!
                      <Heart
                        className="w-5 h-5 text-red-500 fill-red-500 animate-[pulse_2s_ease-in-out_infinite]"
                        strokeWidth={1.5}
                      />
                    </span>

                    <span className="flex items-center justify-center gap-2"> Estamos preparando tudo com muito carinho para recebê-lo.</span>
                  </>
                ) : (
                  "Agradecemos por nos informar. Sua resposta nos ajuda a organizar melhor o evento. Sentiremos sua falta!"
                )}
              </p>

              <div className={`p-4 rounded-lg ${submissionType === "ACCEPTED" ? "bg-success-50" : "bg-danger-50"} border ${submissionType === "ACCEPTED" ? "border-success-100" : "border-danger-100"}`}>
                <p className="text-sm text-text-secondary">
                  Caso mude de ideia, entre em contato conosco para alterar sua resposta.
                </p>
              </div>
            </div>
          ) : (
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
                register={{
                  ...register("additionalInvitees", {
                    required: "Número de convidados é obrigatório",
                    valueAsNumber: true
                  })
                }}
                error={errors.additionalInvitees?.message}
                isNumeric
              />

              <InputTextArea
                label="Observações"
                placeholder="Restrições alimentares, dúvidas, avisos, etc."
                register={{ ...register("observation") }}
                error={errors.observation?.message}
              />

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  variant="outlined-danger"
                  widthFull
                  type="button"
                  onClick={handleOpenRejectionModal}
                  disabled={isLoading || submissionType !== null}
                >
                  Recusar educadamente
                </Button>

                <Button
                  widthFull
                  type="button"
                  onClick={handleOpenConfirmationModal}
                  disabled={isLoading || submissionType !== null}
                >
                  Confirmar presença
                </Button>
              </div>
            </form>
          )}
        </Card>
      </section>

      {isModalOpen && (
        <>
          {modalType === "sendConfirmation" && (
            <Modal
              modalType="action"
              action="Confirmar"
              actionTitle="Confirmar presença"
              actionDescription="Revise as informações antes de confirmar sua presença."
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isActionSuccess
              isLoading={isLoading}
              onSuccess={handleModalSubmit}
            />
          )}

          {modalType === "sendRejection" && (
            <Modal
              modalType="action"
              action="Rejeitar"
              actionTitle="Recusar presença"
              actionDescription="Tem certeza que deseja recusar o convite?"
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              isLoading={isLoading}
              onSuccess={handleModalSubmit}
            />
          )}
        </>
      )}

      <ToastContainer position="bottom-center" autoClose={3000} />
    </FormProvider>
  );
}