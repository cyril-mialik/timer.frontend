import { useCallback, useState } from 'react';
import './App.css'
import Timer from './Timer'

function App() {
  const [targetTime] = useState(() => new Date(Date.now() + 1 * 60 * 1000));

  const handleStart = useCallback((time: number) => {
    console.log('The timer is started!', time);
  }, []);

  const handleStep = useCallback((time: number) => {
    console.log('The step of the timer:', time);
  }, []);

  const handleEnd = useCallback((time: number) => {
    console.log('Timer has ended!', time);
  }, []);

  const timerOptions = {
    value: targetTime,
    separator: ':',
    step: 1000,
  }

  return (
    <>
      <Timer {...timerOptions} onStep={handleStep} onStart={handleStart} onEnd={handleEnd} />
    </>
  )
}

export default App