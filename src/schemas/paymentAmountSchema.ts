import { z } from "zod";

export const paymentAmountSchema = (maxAmount: number) => z.object({
  amount: z
    .number()
    .positive("O valor deve ser maior que zero")
    .min(0.01, "O valor deve ser maior que zero")
    .max(maxAmount, "O valor não pode ser maior que o valor total do presente")
});