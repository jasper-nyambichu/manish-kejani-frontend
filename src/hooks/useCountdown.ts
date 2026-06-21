// src/hooks/useCountdown.ts
// Reusable countdown hook — pass any future Date and get live HH:MM:SS back.
// Returns zeroes when the deadline has passed so the UI can show "Ended".

import { useState, useEffect } from 'react';

interface TimeLeft {
  hours:   number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

const calculate = (deadline: Date): TimeLeft => {
  const diff = deadline.getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    hours:   Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    expired: false,
  };
};

export const useCountdown = (deadline: Date): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculate(deadline));

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(calculate(deadline)), 1000);
    return () => clearInterval(tick);
  }, [deadline.getTime()]);

  return timeLeft;
};