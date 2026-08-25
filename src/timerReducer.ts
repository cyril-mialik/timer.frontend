import type { TimerAction, TimerState } from "./timerTypes";
import { TIMER_ACTION } from "./timerConstants";

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
