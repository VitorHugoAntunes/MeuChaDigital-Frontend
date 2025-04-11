export const translateString = (string: string) => {
  switch (string) {
    case 'RANDOM':
      return 'Chave aleatória';
    case 'CPF':
      return 'CPF';
    case 'PHONE':
      return 'Telefone';
    case 'EMAIL':
      return 'E-mail';
    default:
      return string;
  }
}

export const translateBankAccountType = (type: string) => {
  switch (type) {
    case 'PERSONAL':
      return 'Pessoa física';
    case 'BUSINESS':
      return 'Pessoa jurídica';
    default:
      return type;
  }
}

export const translatePaymentStatus = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Pendente';
    case 'PAID':
      return 'Pago';
    case 'CANCELED':
      return 'Cancelado';
    default:
      return status;
  }
}

export const translatePaymentMethod = (method: string) => {
  switch (method) {
    case 'PIX':
      return 'Pix';
    case 'CREDIT_CARD':
      return 'Cartão de crédito';
    case 'DEBIT_CARD':
      return 'Cartão de débito';
    default:
      return method;
  }
}