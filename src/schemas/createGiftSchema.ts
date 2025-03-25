import { z } from "zod";

export const giftSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(100, "O nome deve ter no máximo 100 caracteres"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    errorMap: () => ({ message: "Selecione uma prioridade válida" }),
  }),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").max(250, "A descrição deve ter no máximo 250 caracteres"),
  totalValue: z
    .number({ required_error: "O valor é obrigatório" })
    .positive("O valor deve ser maior que zero")
    .min(0.01, "O valor deve ser maior que zero")
    .max(10000, "O valor não pode ser maior que o limite de R$ 10.000,00"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  userId: z.string().min(1, "O usuário é obrigatório"),
  giftListId: z.string().min(1, "A lista de presentes é obrigatória"),
  giftPhoto: z
    .instanceof(File, { message: "A foto do presente é obrigatória" })
    .refine((file) => file.size > 0, "A foto do presente é obrigatória")
    .nullable(),
});

export const giftUpdateSchema = giftSchema.extend({
  id: z.string().min(1, "O ID do presente é obrigatório"),
});

export type GiftFormData = z.infer<typeof giftSchema>;
export type GiftUpdateFormData = z.infer<typeof giftUpdateSchema>;