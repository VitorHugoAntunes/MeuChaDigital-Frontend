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