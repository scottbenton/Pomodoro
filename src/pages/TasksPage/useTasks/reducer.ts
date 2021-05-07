import { actions, TaskState, REDUCER_ACTIONS } from "./types";

export function reducer(state: TaskState, action: actions) {
  let newState: TaskState = { loading: false };

  switch (action.type) {
    case REDUCER_ACTIONS.SET_TASKS:
      newState.tasks = action.tasks;
      break;
    case REDUCER_ACTIONS.SET_ERROR:
      newState.error = action.error;
      break;
  }

  return newState;
}
