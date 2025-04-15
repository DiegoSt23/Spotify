import { useState, useEffect } from 'react';

export const useFormatMs = (milliseconds?: number, total?: boolean) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    if (milliseconds) {
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
      const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
      const totalHours = hours > 0 ? `${hours.toString()}h` : '';
      const totalMins = minutes > 0 ? `${minutes.toString()}m` : '';

      if (total) {
        setFormattedTime(`${totalHours} ${totalMins}`);
      } else {
        setFormattedTime(`
          ${
            hours > 0 ? `${hours.toString()}:` : ''
          }${minutes.toString()}:${seconds.toString().padStart(2, '0')}`);
      }
    } else {
      setFormattedTime('0h 0m');
    }
  }, [milliseconds, total]);

  return { formattedTime };
};
