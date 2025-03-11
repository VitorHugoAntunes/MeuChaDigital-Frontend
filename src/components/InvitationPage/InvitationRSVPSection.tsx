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

interface InvitationRSVPSectionProps {
  giftListId: string;
}

export default function InvitationRSVPSection({ giftListId }: InvitationRSVPSectionProps) {

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
    formState: { errors },
  } = methods;

  const { mutate, isLoading } = useCreateInvitee();

  const status = watch("status");

  const onSubmit: SubmitHandler<InviteeFormData> = async (data) => {
    console.log("Dados enviados:", data);

    const dataToSend = {
      ...data,
      observation: data.observation || "-",
    };

    mutate(dataToSend, {
      onSuccess: () => {
        toast.success("Resposta enviada com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      onError: (error) => {
        toast.error("Erro ao enviar resposta. Tente novamente.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error("Erro ao enviar confirmação:", error);
      },
    });
  };

  const setStatusAndSubmit = (status: "ACCEPTED" | "REJECTED") => {
    setValue("status", status);

    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <section id="rsvp" className="py-16 px-8 bg-gray-50">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">
          Confirme sua presença
        </h2>
        <Card className="max-w-screen-sm w-full mx-auto">
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

            <div className="flex justify-between mt-8 gap-4">
              <Button
                variant="outlined-danger"
                widthFull
                type="button"
                onClick={() => setStatusAndSubmit("REJECTED")}
                disabled={isLoading}
              >
                {isLoading && status === "REJECTED" ? "Enviando..." : "Recusar educadamente"}
              </Button>

              <Button
                widthFull
                type="button"
                onClick={() => setStatusAndSubmit("ACCEPTED")}
                disabled={isLoading}
              >
                {isLoading && status === "ACCEPTED" ? "Enviando..." : "Confirmar presença"}
              </Button>
            </div>
          </form>
        </Card>
      </section>

      <ToastContainer />
    </FormProvider>
  );
}