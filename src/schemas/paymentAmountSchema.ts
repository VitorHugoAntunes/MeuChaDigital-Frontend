import { z } from "zod";

export const paymentAmountSchema = (maxAmount: number) =>
  z.object({
    amount: z
      .number({ required_error: "O valor é obrigatório" })
      .positive("O valor deve ser maior que zero")
      .min(0.01, "O valor deve ser maior que zero")
      .max(maxAmount, "O valor não pode ser maior que o valor total do presente"),
    message: z.string()
      .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
      .max(150, { message: "A mensagem deve ter no máximo 80 caracteres" })
      .optional()
      .or(z.literal('')),
  });