import { useCallback, useEffect, useState, useRef } from 'react';
import styles from './Timer.module.css';

interface TimerProps {
  value: Date;
  separator?: string;
  step?: number;

  onStep?: (time: number) => void
  onStart?: (time: number) => void
  onEnd?: (time: number) => void
}

function Timer({
  value,
  separator = ':',
  step = 1000,

  onStep = () => ({}),
  onStart = () => ({}),
  onEnd = () => ({}),
}: TimerProps) {
  const [timer, setTimer] = useState<number>(() => {
    const diff = value.getTime() - Date.now();
    return Math.max(0, diff);
  });

  const isStartedRef = useRef<boolean>(false);
  const isEndedRef = useRef<boolean>(false);

  const handleStep = useCallback(() => {
    onStep(timer);
  }, [timer, onStep]);

  const handleStart = useCallback(() => {
    if (isStartedRef.current) {
      return;
    }

    isStartedRef.current = true;
    onStart(timer);
  }, [timer, onStart]);

  const handleEnd = useCallback(() => {
    if (isEndedRef.current) {
      return;
    }

    isEndedRef.current = true;
    onEnd(timer);
  }, [timer, onEnd]);

  useEffect(() => {
    if (timer < 0) {
      return;
    }

    handleStart();
    
    const interval = setInterval(() => {
      setTimer((previousTimer) => {
        const updatedTimer = previousTimer - 1000;

        if (updatedTimer <= 0) {
          handleEnd();
          clearInterval(interval);
          
          return 0;
        }

        return updatedTimer;
      });

      handleStep();
    }, step);

    return () => clearInterval(interval);
  }, [timer, step, handleStart, handleStep, handleEnd]);

  const format = (time: number): string => {
    return time.toString().padStart(2, '0');
  };

  const seconds = Math.floor(timer / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedSeconds = format(seconds % 60);
  const formattedMinutes = format(minutes % 60);
  const formattedHours = format(hours % 24);

  const isWarning = hours === 0 && minutes <= 2;
  const isExpired = hours === 0 && minutes === 0 && seconds <= 10;

  const warningClass = isWarning ? styles.Warning : '';
  const expiredClass = isExpired ? styles.Expired : '';
  const classNames = `${styles.Timer} ${warningClass} ${expiredClass}`.trim();

  return (
    <time className={classNames} dateTime={value.toISOString()}>
      {formattedHours}{separator}{formattedMinutes}{separator}{formattedSeconds}
    </time>
  );
}

export default Timer;