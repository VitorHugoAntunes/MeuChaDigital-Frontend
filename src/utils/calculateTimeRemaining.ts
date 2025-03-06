const calculateTimeRemaining = (
  expirationDate: string,
  onUpdate: (time: string) => void // Callback para atualizar o tempo restante
): (() => void) => {
  const expiration = new Date(expirationDate);

  const update = () => {
    const now = new Date();
    let difference = expiration.getTime() - now.getTime();
    difference = Math.max(0, difference); // Evita valores negativos

    const hours = String(Math.floor(difference / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}`;
    onUpdate(timeString); // callback com o tempo atualizado

    if (difference === 0) {
      clearInterval(interval);
    }
  };

  const interval = setInterval(update, 1000);
  update();

  return () => clearInterval(interval);
};

export default calculateTimeRemaining;