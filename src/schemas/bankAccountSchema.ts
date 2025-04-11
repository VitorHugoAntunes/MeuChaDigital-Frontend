import { z } from "zod";

const validateCPF = (value: string) => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(value);
};

const validateCNPJ = (value: string) => {
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cnpjRegex.test(value);
}

export const bankAccountFormSchema = z
  .object({
    accountType: z.string().nonempty("Selecione o tipo da conta"),
    accountNumber: z.string()
      .nonempty("O número da conta é obrigatório")
      .min(4, "O número da conta deve ter pelo menos 4 dígitos")
      .max(20, "O número da conta deve ter no máximo 20 dígitos"),
    documentValue: z.string().nonempty("O documento é obrigatório"),
  })
  .refine(
    (data) => {
      const { accountType, documentValue } = data;

      switch (accountType) {
        case "CPF":
          return validateCPF(documentValue);
        case "CNPJ":
          return validateCNPJ(documentValue);
        default:
          return false;
      }
    },
    {
      message: "Documento inválido para o tipo selecionado",
      path: ["documentValue"],
    }
  );

export type BankAccountFormData = z.infer<typeof bankAccountFormSchema>;