import { useState, useEffect } from 'react';
import { Timer, Clock } from 'lucide-react';

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete: () => void;
}

export function CountdownTimer({ initialSeconds, onComplete }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  // Calculate urgency for color changes
  const urgencyLevel = seconds <= 3 ? 'critical' : seconds <= 15 ? 'warning' : 'normal';
  
  // Format time display
  const formatTime = (seconds: number) => {
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else if (seconds >= 60) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${seconds}s`;
    }
  };

  const getTimerStyles = () => {
    switch (urgencyLevel) {
      case 'critical':
        return {
          container: 'bg-red-500/90 border-red-400/50 animate-pulse',
          text: 'text-white',
          icon: 'text-red-100',
          pulse: true
        };
      case 'warning':
        return {
          container: 'bg-orange-500/90 border-orange-400/50',
          text: 'text-white',
          icon: 'text-orange-100',
          pulse: false
        };
      default:
        return {
          container: 'bg-black/70 border-gray-600/30',
          text: 'text-white',
          icon: 'text-gray-200',
          pulse: false
        };
    }
  };

  const styles = getTimerStyles();

  return (
    <>
      {/* Timer positioned absolutely within parent container */}
      <div className="absolute top-2 right-2 z-20 pointer-events-none">
        <div className={`
          flex items-center gap-1.5 px-2 py-1 rounded-full shadow-lg border backdrop-blur-md
          transition-all duration-300 ease-in-out text-xs
          ${styles.container}
          ${styles.pulse ? 'animate-pulse' : ''}
        `}>
          <Clock className={`w-3 h-3 ${styles.icon}`} />
          <span className={`font-mono font-bold tabular-nums ${styles.text}`}>
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* Critical Time Warning Overlay - only for very urgent situations */}
      {urgencyLevel === 'critical' && seconds <= 3 && (
        <div className="absolute inset-0 pointer-events-none z-30 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
          
        </div>
      )}
    </>
  );
}