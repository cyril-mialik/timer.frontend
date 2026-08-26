import { useReducer, useCallback } from 'react';
import Timer from './Timer'
import useTimer from './useTimer';
import { timerReducer, timerEndDispatcher, timerStartDispatcher, timerStepDispatcher } from './timerReducer';
import { initialState } from './timerConstants';

function App() {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  const handleStart = useCallback((value: number) => {
    dispatch(timerStartDispatcher());
    console.log('The timer is started!', value);
  }, []);

  const handleEnd = useCallback((value: number) => {
    dispatch(timerEndDispatcher());
    console.log('Timer has ended!', value);
  }, []);

  const handleStep = useCallback((value: number) => {
    dispatch(timerStepDispatcher(value));
    console.log('The step of the timer:', value);
  }, []);

  const timer = useTimer({
    value: state.value,
    separator: ':',
    step: 1000,
    onStart: handleStart,
    onEnd: handleEnd,
    onStep: handleStep,
  });

  return <Timer {...timer} />
}

export default App