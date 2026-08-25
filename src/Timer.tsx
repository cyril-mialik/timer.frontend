import styles from './Timer.module.css';
import { useMemo } from 'react';
import type { TimerProps } from './timerTypes';

function Timer({
  value,
  separator = ':',
}: TimerProps) {
  const format = (time: number): string => {
    return time.toString().padStart(2, '0');
  };

  const mappedTime = Number(value);

  const seconds = Math.floor(mappedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedSeconds = useMemo(() => format(seconds % 60), [seconds]);
  const formattedMinutes = useMemo(() => format(minutes % 60), [minutes]);
  const formattedHours = useMemo(() => format(hours % 24), [hours]);

  const isWarning = hours === 0 && minutes <= 2;
  const isExpired = hours === 0 && minutes === 0 && seconds <= 10;

  const warningClass = isWarning ? styles.Warning : '';
  const expiredClass = isExpired ? styles.Expired : '';
  const classNames = `${styles.Timer} ${warningClass} ${expiredClass}`.trim();

  return (
    <time className={classNames} dateTime={new Date(value).toString()}>
      {formattedHours}{separator}{formattedMinutes}{separator}{formattedSeconds}
    </time>
  );
}

export default Timer;