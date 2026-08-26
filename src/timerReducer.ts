import type { TimerAction, TimerState } from "./timerTypes";
import { TIMER_ACTION } from "./timerConstants";

export const timerStartDispatcher = (): TimerAction => ({ type: TIMER_ACTION.START });
export const timerEndDispatcher = (): TimerAction => ({ type: TIMER_ACTION.END });
export const timerStepDispatcher = (payload: number): TimerAction => ({ type: TIMER_ACTION.STEP, payload });

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case TIMER_ACTION.START:
      return { ...state };

    case TIMER_ACTION.STEP:
      return {
        ...state,
        value: action.payload,
      };

    case TIMER_ACTION.END:
      return { ...state };

    default:
      return state;
  }
}

export { TIMER_ACTION };
