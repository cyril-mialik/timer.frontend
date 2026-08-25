import { TIMER_ACTION } from "./timerReducer";

export interface TimerState {
  value: number;
}

export type TimerAction =
  | { type: typeof TIMER_ACTION.START }
  | { type: typeof TIMER_ACTION.STEP; payload: number }
  | { type: typeof TIMER_ACTION.END }

export interface UseTimerInput extends TimerState {
  separator?: string;
  step?: number;

  onStep: (value: number) => void;
  onStart?: (value: number) => void;
  onEnd?: (value: number) => void;
}

export interface UseTimerOutput extends TimerState {
  separator: string;
}

export type TimerProps = UseTimerOutput;