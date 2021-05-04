import firebase from "firebase";

export interface TaskDTO {
  id: string;
  task: string | null;
  priority: number | null;
  dueDate: Date | null;
  completed: boolean;
  createdDate: Date;
  completedDate: Date | null;
}

export interface DBTask {
  id: string;
  task: string | null;
  priority: number | null;
  dueDate: firebase.firestore.Timestamp | null;
  completed: boolean;
  createdDate: firebase.firestore.Timestamp;
  completedDate: firebase.firestore.Timestamp | null;
}

export function convertDBTasksToTaskDTO(dbTasks: DBTask[]) {
  return dbTasks.map((dbTask) => convertDBTaskToTaskDTO(dbTask));
}

export function convertDBTaskToTaskDTO(dbTask: DBTask) {
  const task: TaskDTO = {
    id: dbTask.id,
    task: dbTask.task,
    priority: dbTask.priority,
    completed: dbTask.completed,
    dueDate: dbTask.dueDate?.toDate() ?? null,
    createdDate: dbTask.createdDate.toDate(),
    completedDate: dbTask.completedDate?.toDate() ?? null,
  };
  return task;
}
