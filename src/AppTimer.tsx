import { useReducer, useCallback } from 'react';
import Timer from './Timer'
import useTimer from './useTimer';
import { timerReducer, timerEndDispatcher, timerStartDispatcher, timerStepDispatcher } from './timerReducer';
import { initialState } from './timerConstants';
import type { TimerState } from './timerTypes';

type AppTimerProps = Partial<Pick<TimerState, 'value'>>;

function AppTimer({ value }: AppTimerProps) {
  const [state, dispatch] = useReducer(timerReducer, value ? { ...initialState, value }: initialState);

  const handleStart = useCallback((value: number) => {
    dispatch(timerStartDispatcher());
    console.log('The timer is started!', value);
  }, []);

  const handleEnd = useCallback((value: number) => {
    dispatch(timerEndDispatcher());
    console.log('Timer has ended!', value);
  }, []);

  const handleStep = useCallback(({ value, step }: { value: number, step: number }) => {
    dispatch(timerStepDispatcher({ value, step }));
    console.log('The step of the timer:', value);
  }, []);

  const timer = useTimer({
    value: state.value,
    separator: state.separator,
    step: state.step,
    onStart: handleStart,
    onEnd: handleEnd,
    onStep: handleStep,
  });

  return <Timer {...timer} />
}

export default AppTimer;