"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete: () => void;
}

export function CountdownTimer({ initialSeconds, onComplete }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    // If the timer has reached zero, call the onComplete callback and stop.
    if (seconds <= 0) {
      onComplete();
      return;
    }

    // Set up an interval to tick down every second.
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    // This is a cleanup function. It runs if the component is removed
    // from the screen, preventing memory leaks.
    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  return (
    <p className="text-sm text-muted-foreground mt-4">
      This message will self-destruct in {seconds} second{seconds !== 1 ? 's' : ''}...
    </p>
  );
}