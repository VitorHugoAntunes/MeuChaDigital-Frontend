import { z } from "zod";

export const listSettingsSchema = z.object({
  eventType: z.string().min(1, "Selecione um tipo de evento"),
  listName: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  listSlug: z.string().min(3, "O slug deve ter pelo menos 3 caracteres"),
  eventDate: z.string().min(1, "Escolha uma data válida"),
  eventTime: z.string().min(1, "Escolha um horário válido"),
  listDescription: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  listStatus: z.enum(["ACTIVE", "INACTIVE"], {
    errorMap: () => ({ message: "Selecione um status entre ativa e inativa" }),
  }),

  banner: z
    .instanceof(File, { message: "A foto da capa é obrigatória" })
    .refine((file) => file.size > 0, "A foto da capa é obrigatória"),
  momentImages: z
    .array(z.instanceof(File), { message: "Adicione pelo menos uma foto" })
    .max(5, "Você pode adicionar no máximo 5 fotos")
    .refine((files) => files.length > 0, "Adicione pelo menos uma foto"),

  address: z.object({
    zipCode: z
      .string()
      .min(1, "CEP é obrigatório")
      .transform((value) => value.replace(/[^0-9]/g, ''))
      .refine((value) => value.length === 8, "CEP inválido"),
    streetAddress: z.string().min(3, "O logradouro deve ter pelo menos 3 caracteres"),
    streetNumber: z.string().min(1, "Número é obrigatório"),
    addressLine2: z.string().optional(),
    neighborhood: z.string().min(3, "O bairro deve ter pelo menos 3 caracteres"),
    city: z.string().min(3, "A cidade deve ter pelo menos 3 caracteres"),
    state: z.string().min(2, "O estado deve ter 2 caracteres"),
  }),
});

export type ListSettingsFormData = z.infer<typeof listSettingsSchema>;
