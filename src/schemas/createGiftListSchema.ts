import { z } from "zod";

export const eventSchema = z.object({
  type: z.string().min(1, "Selecione um tipo de evento"),
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  slug: z.string().min(3, "O slug deve ter pelo menos 3 caracteres"),
  date: z.string().min(1, "Escolha uma data válida"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  banner: z
    .instanceof(File, { message: "A foto do banner é obrigatória" })
    .refine((file) => file.size > 0, "A foto do banner é obrigatória"),
  moments_images: z
    .array(z.instanceof(File))
    .max(5, "Você pode adicionar no máximo 5 fotos")
    .refine((files) => files.length > 0, "Adicione pelo menos uma foto"),
});

export type EventFormData = z.infer<typeof eventSchema>;
