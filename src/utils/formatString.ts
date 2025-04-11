export const formatCPF = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatCNPJ = (cnpj: string) => {
  return cnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
};

export const formatBankAccount = (account: string) => {
  const cleaned = account.replace(/\D/g, '');

  if (cleaned.length < 2 || cleaned.length > 20) {
    return account;
  }

  const main = cleaned.slice(0, -1);
  const digit = cleaned.slice(-1);

  return `${main}-${digit}`;
}


export const formatPhone = (phone: string) => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatSlug = (slug: string) => {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatZipCode = (zipCode: string) => {
  return zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
};