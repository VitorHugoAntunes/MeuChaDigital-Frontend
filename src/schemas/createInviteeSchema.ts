import { z } from "zod";

export const inviteeSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "O telefone deve ter pelo menos 10 caracteres"),
  email: z.string().email("O email deve ser válido"),
  additionalInvitees: z.number({ invalid_type_error: "O número de convidados adicionais deve ser um número válido" }).min(0, "O número de convidados adicionais deve ser maior ou igual a 0"),
  observation: z
    .string()
    .optional()
    .refine(
      (value) => !value || value.length >= 10,
      "A observação deve ter pelo menos 10 caracteres"
    ),
  giftListId: z.string().min(1, "A lista de presentes é obrigatória"),
  status: z.enum(["REJECTED", "ACCEPTED"], {
    errorMap: () => ({ message: "Selecione um status válido" }),
  }),
});

export type InviteeFormData = z.infer<typeof inviteeSchema>;