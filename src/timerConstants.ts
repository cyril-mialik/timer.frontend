import type { TimerState } from "./timerTypes";

export const TIMER_ACTION = {
  START: 'START',
  STEP: 'STEP',
  END: 'END',
} as const;

export const initialState = {
  value: 5 * 60 * 1000,
  step: 1000,
  separator: ':',
} satisfies TimerState;