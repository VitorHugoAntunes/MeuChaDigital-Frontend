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

export const formatDateToLong = (date: string) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    console.error("Data inválida:", date);
    return "Data inválida";
  }

  return parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const formatDateToFull = (date: string) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    console.error("Data inválida:", date);
    return "Data inválida";
  }

  const utcDate = new Date(Date.UTC(
    parsedDate.getUTCFullYear(),
    parsedDate.getUTCMonth(),
    parsedDate.getUTCDate(),
    parsedDate.getUTCHours(),
    parsedDate.getUTCMinutes(),
    parsedDate.getUTCSeconds()
  ));

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC' // Força o uso de UTC na formatação
  };

  return utcDate.toLocaleDateString("pt-BR", options);
};

export const formatDateToTime = (date: string) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    console.error("Data inválida:", date);
    return "Data inválida";
  }

  return parsedDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const formatDateToRelativeTime = (date: string): string => {
  const inputDate = new Date(date);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  const secondsPerYear = 31536000;
  const secondsPerMonth = 2592000;
  const secondsPerDay = 86400;
  const secondsPerHour = 3600;
  const secondsPerMinute = 60;

  if (diffInSeconds >= secondsPerYear) {
    const years = Math.floor(diffInSeconds / secondsPerYear);
    return `há ${years} ano${years > 1 ? 's' : ''}`;
  }

  if (diffInSeconds >= secondsPerMonth) {
    const months = Math.floor(diffInSeconds / secondsPerMonth);
    return `há ${months} ${months > 1 ? 'meses' : 'mês'}`;
  }

  if (diffInSeconds >= secondsPerDay) {
    const days = Math.floor(diffInSeconds / secondsPerDay);
    return `há ${days} dia${days > 1 ? 's' : ''}`;
  }

  if (diffInSeconds >= secondsPerHour) {
    const hours = Math.floor(diffInSeconds / secondsPerHour);
    return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  }

  if (diffInSeconds >= secondsPerMinute) {
    const minutes = Math.floor(diffInSeconds / secondsPerMinute);
    return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  }

  return 'há alguns segundos';
};
