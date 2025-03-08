export const formatDateToBR = (date: string) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    console.error("Data inválida:", date);
    return "Data inválida";
  }

  return parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatDateToFull = (date: string) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    console.error("Data inválida:", date);
    return "Data inválida";
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return parsedDate.toLocaleDateString("pt-BR", options);
};
