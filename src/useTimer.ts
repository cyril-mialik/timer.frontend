import { useEffect, useEffectEvent, useRef } from "react";
import type { UseTimerInput, UseTimerOutput } from "./timerTypes";

const useTimer = ({
  value,
  step = 1000,
  separator = ':',

  onStart,
  onEnd,
  onStep,
}: UseTimerInput): UseTimerOutput => {
  const timeoutIdRef = useRef<number | null>(null);
  const isTimeoutStartRef = useRef<boolean>(false);
  const isTimeoutEndRef = useRef<boolean>(false);

  const handleStart = useEffectEvent((value: number) => onStart?.(value));
  const handleEnd = useEffectEvent((value: number) => onEnd?.(value));
  const handleStep = useEffectEvent((value: number) => onStep(value));

  const setTimerTimeout = useEffectEvent((value: number) => setTimeout(() => {
    const calculatedValue = Math.max(0, value - step);

    handleStep(calculatedValue);
  }, step));

  const clearTimerTimeout = useEffectEvent(() => {
    if (!timeoutIdRef.current) {
      return;
    }

    clearTimeout(timeoutIdRef.current);
  });

  const checkTimerEnd = useEffectEvent(() => value <= 0);

  useEffect(() => {
    if (!isTimeoutEndRef.current && checkTimerEnd()) {
      isTimeoutEndRef.current = true;
      handleEnd(value);

      return;
    }

    if (!isTimeoutStartRef.current) {
      isTimeoutStartRef.current = true;
      handleStart(value);
    }

    timeoutIdRef.current = setTimerTimeout(value);
    return () => clearTimerTimeout();
  }, [value]);

  return { value, separator };
}

export default useTimer;