import { z } from "zod";

export const giftSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    errorMap: () => ({ message: "Selecione uma prioridade válida" }),
  }),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  totalValue: z.number({ invalid_type_error: "O preço deve ser um número válido" }).min(1, "O valor total deve ser maior que 0").positive("O valor total deve ser maior que 0"),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  userId: z.string().min(1, "O usuário é obrigatório"),
  giftListId: z.string().min(1, "A lista de presentes é obrigatória"),
  giftPhoto: z
    .instanceof(File, { message: "A foto do presente é obrigatória" })
    .refine((file) => file.size > 0, "A foto do presente é obrigatória"),
});

export type GiftFormData = z.infer<typeof giftSchema>;
