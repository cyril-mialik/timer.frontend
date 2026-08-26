import { TIMER_ACTION } from "./timerReducer";

export interface TimerState {
  value: number;
  step: number;
  separator: string;
}

export type TimerInput = Omit<TimerState, 'separator'>;

export type TimerAction =
  | { type: typeof TIMER_ACTION.START }
  | { type: typeof TIMER_ACTION.STEP; payload: TimerInput }
  | { type: typeof TIMER_ACTION.END }

export interface UseTimerInput extends TimerState {
  onStep: ({ value, step }: TimerInput) => void;
  onStart?: (value: number) => void;
  onEnd?: (value: number) => void;
}

export type UseTimerOutput = TimerState;
export type TimerProps = TimerState;