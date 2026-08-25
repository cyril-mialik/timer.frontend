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
  const isIntervalStartRef = useRef<boolean>(false);
  const isIntervalEndRef = useRef<boolean>(false);

  const handleStart = useEffectEvent((value: number) => onStart?.(value));
  const handleEnd = useEffectEvent((value: number) => onEnd?.(value));
  const handleStep = useEffectEvent((value: number) => onStep(value));

  const hasTimerEnd = value <= 0;

  const clearTimerTimeout = () => {
    if (!timeoutIdRef.current) {
      return;
    }

    clearTimeout(timeoutIdRef.current);
  }

  const setTimerStartInterval = (state = true) => {
    isIntervalStartRef.current = state;
  };

  const setTimerEndInterval = (state = true) => {
    isIntervalEndRef.current = state;
  };

  useEffect(() => {
    if (hasTimerEnd && !isIntervalEndRef.current) {
      setTimerEndInterval();
      handleEnd(value);

      return;
    }

    if (!isIntervalStartRef.current) {
      setTimerStartInterval();
      handleStart(value);
    }

    timeoutIdRef.current = setTimeout(() => {
      const calculatedValue = Math.max(0, value - step);

      handleStep(calculatedValue);
    }, step);

    return () => clearTimerTimeout();
  }, [value, step, hasTimerEnd]);

  return { value, separator };
}

export default useTimer;