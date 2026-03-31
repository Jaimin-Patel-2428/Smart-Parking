import { useState, useEffect } from "react";

export const useSlotLock = (expiryTime) => {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!expiryTime) return;
    const interval = setInterval(() => {
      const diff = Math.floor((new Date(expiryTime) - new Date()) / 1000);
      setSecondsLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryTime]);

  const formatTime = () => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return { secondsLeft, formatTime, isExpired: secondsLeft === 0 };
};
