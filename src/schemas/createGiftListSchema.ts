import { z } from "zod";

export const eventSchema = z.object({
  type: z.string().min(1, "Selecione um tipo de evento"),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(100, "O nome deve ter no máximo 100 caracteres"),
  slug: z.string().min(3, "O slug deve ter pelo menos 3 caracteres"),
  date: z
    .string()
    .min(1, "Escolha uma data válida")
    .refine((value) => {
      const selectedDate = new Date(value);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate >= today;
    }, "A data deve ser hoje ou no futuro"),
  time: z.string().min(1, "Escolha um horário válido"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").max(250, "A descrição deve ter no máximo 250 caracteres"),
  banner: z
    .instanceof(File, { message: "A foto da capa é obrigatória" })
    .refine((file) => file.size > 0, "A foto da capa é obrigatória"),
  moments_images: z
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

export type EventFormData = z.infer<typeof eventSchema>;
