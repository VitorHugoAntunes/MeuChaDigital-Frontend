export const CPFMask = (value: string): string => {
  const numbersOnly = value.replace(/\D+/g, '').slice(0, 11); // limita a 11 dígitos

  return numbersOnly
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2');
};

export const CNPJMask = (value: string): string => {
  const numbersOnly = value.replace(/\D+/g, '').slice(0, 14);

  return numbersOnly
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2');
};

export const BankAccountMask = (value: string): string => {
  const numbersOnly = value.replace(/\D+/g, '').slice(0, 20);
  return numbersOnly;
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

export const ZipCodeMask = (value: string) => {
  return value.
    replace(/\D/g, '').
    replace(/(\d{5})(\d)/, '$1-$2').
    replace(/(-\d{3})\d+?$/, '$1');
}

export const TimeMask = (value: string) => {
  return value.
    replace(/\D/g, '').
    replace(/(\d{2})(\d)/, '$1:$2').
    replace(/(:\d{2})\d+?$/, '$1');
}

export const applyMask = (value: string, mask: (value: string) => string) => {
  return mask(value);
}

export const removeMask = (value: string) => {
  if (!value) return value;

  return value.replace(/\D/g, '');
}