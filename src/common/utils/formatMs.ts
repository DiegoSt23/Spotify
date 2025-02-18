export const formatMs = (milliseconds?: number, total?: boolean) => {
  if (milliseconds) {
     const seconds = Math.floor((milliseconds / 1000) % 60);
     const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
     const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
     const totalHours = hours > 0 ? `${hours.toString()}h` : '';
     const totalMins = minutes > 0 ? `${minutes.toString()}m` : '';

     if (total) {
       return `${totalHours} ${totalMins}`;
     }

     return `
    ${hours > 0 ? `${hours.toString()}:` : ''}${minutes.toString()}:${seconds
       .toString()
       .padStart(2, '0')}`;
  };

  return '';
};
