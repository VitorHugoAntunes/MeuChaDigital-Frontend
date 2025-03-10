import { z } from "zod";

const validateCPF = (value: string) => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(value);
};

const validatePhone = (value: string) => {
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return phoneRegex.test(value);
};

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const validateUUID = (value: string) => {
  const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
  return uuidRegex.test(value);
};

export const pixFormSchema = z
  .object({
    keyType: z.string().nonempty("Selecione o tipo da chave"),
    keyValue: z.string().nonempty("O valor da chave é obrigatório"),
  })
  .refine(
    (data) => {
      const { keyType, keyValue } = data;

      switch (keyType) {
        case "CPF":
          return validateCPF(keyValue);
        case "PHONE":
          return validatePhone(keyValue);
        case "EMAIL":
          return validateEmail(keyValue);
        case "RANDOM":
          return validateUUID(keyValue); // Validação do UUID v4
        default:
          return false;
      }
    },
    {
      message: "Valor da chave inválido para o tipo selecionado",
      path: ["keyValue"],
    }
  );

export type PixFormData = z.infer<typeof pixFormSchema>;