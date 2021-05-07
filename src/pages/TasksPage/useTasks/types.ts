import { TaskDTO } from "domain/TaskDTO";

export interface TaskState {
  loading: boolean;
  tasks?: TaskDTO[];
  error?: string;
}

export enum REDUCER_ACTIONS {
  SET_TASKS,
  SET_ERROR,
}

interface BaseAction {
  type: REDUCER_ACTIONS;
}

interface SetTaskAction extends BaseAction {
  type: REDUCER_ACTIONS.SET_TASKS;
  tasks: TaskDTO[];
}

interface SetErrorAction extends BaseAction {
  type: REDUCER_ACTIONS.SET_ERROR;
  error: string;
}

export type actions = SetTaskAction | SetErrorAction;
