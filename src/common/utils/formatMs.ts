export const formatMs = (milliseconds: number) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

  return `
    ${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
};
