export const CPFMask = (value: string) => {
  return value.
    replace(/\D/g, '').
    replace(/(\d{3})(\d)/, '$1.$2').
    replace(/(\d{3})(\d)/, '$1.$2').
    replace(/(\d{3})(\d{1,2})/, '$1-$2').
    replace(/(-\d{2})\d+?$/, '$1');
}

export const PhoneMask = (value: string) => {
  return value.
    replace(/\D/g, '').
    replace(/(\d{2})(\d)/, '($1) $2').
    replace(/(\d{5})(\d)/, '$1-$2').
    replace(/(-\d{4})\d+?$/, '$1');
}

export const CurrencyMask = (value: string) => {
  let onlyDigits = value.replace(/\D/g, '');

  onlyDigits = onlyDigits.padStart(3, '0');

  let numericValue = parseInt(onlyDigits, 10).toString();

  numericValue = numericValue.padStart(3, '0');

  const formattedValue =
    numericValue.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
    ',' +
    numericValue.slice(-2);

  return `R$ ${formattedValue}`;
};
