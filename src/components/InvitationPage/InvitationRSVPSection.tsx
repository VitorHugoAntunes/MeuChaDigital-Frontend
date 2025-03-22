import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/Card";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import InputTextArea from "@/components/InputTextArea";
import { InviteeFormData, inviteeSchema } from "@/schemas/createInviteeSchema";
import { useCreateInvitee } from "@/hooks/invitee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PhoneMask } from "@/utils/masks";

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

  function removeMask(value: string) {
    return value.replace(/\D/g, "");
  }

  const onSubmit: SubmitHandler<InviteeFormData> = async (data) => {
    console.log("Dados enviados:", data);

    const dataToSend = {
      ...data,
      phone: removeMask(data.phone),
      observation: data.observation || "-",
    };

    mutate(dataToSend);
  };

  const setStatusAndSubmit = (status: "ACCEPTED" | "REJECTED") => {
    setValue("status", status);

    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <section id="rsvp" className="mt-8 bg-gray-50">
        <h2 className="text-center text-2xl sm:text-4xl font-bold text-gray-900 mb-8 lg:mb-12">
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

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
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