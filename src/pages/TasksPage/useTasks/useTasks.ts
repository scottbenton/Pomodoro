import firebase from "firebase";
import { TaskDTO, DBTask, convertDBTasksToTaskDTO } from "domain/TaskDTO";
import { useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { REDUCER_ACTIONS } from "./types";
import { orderTasks } from "./orderTasks";

const taskCollection = "tasks";
interface ITaskCollection {
  [key: string]: DBTask;
}
type TaskSnapshot = firebase.firestore.DocumentSnapshot<ITaskCollection>;

export function useTasks(uid: string) {
  const [taskState, dispatch] = useReducer(reducer, { loading: true });

  useEffect(() => {
    const handleSnapshot = (snapshot: TaskSnapshot) => {
      const data = snapshot.data();
      dispatch({
        type: REDUCER_ACTIONS.SET_TASKS,
        tasks: data
          ? orderTasks(convertDBTasksToTaskDTO(Object.values(data)))
          : [],
      });
    };
    const handleError = (error: firebase.firestore.FirestoreError) => {
      dispatch({
        type: REDUCER_ACTIONS.SET_ERROR,
        error: error.message ?? "Error loading tasks.",
      });
    };

    const unsubscribe = firebase
      .firestore()
      .collection(taskCollection)
      .doc(uid)
      .onSnapshot(
        (snapshot) => handleSnapshot(snapshot as TaskSnapshot),
        handleError
      );

    return () => {
      unsubscribe();
    };
  }, [uid]);

  const createTask = () => {
    const timestamp = new Date();
    const id = timestamp.toUTCString();

    const taskToCreate: TaskDTO = {
      id,
      createdDate: timestamp,
      completed: false,
      task: null,
      priority: null,
      dueDate: null,
      completedDate: null,
    };

    firebase
      .firestore()
      .collection(taskCollection)
      .doc(uid)
      .set(
        {
          [id]: taskToCreate,
        },
        { merge: true }
      );
  };

  const updateTask = (task: TaskDTO) => {
    firebase
      .firestore()
      .collection(taskCollection)
      .doc(uid)
      .update({
        [task.id]: task,
      });
  };

  const deleteTask = (task: TaskDTO) => {
    console.debug(task, "is being deleted");
    firebase
      .firestore()
      .collection(taskCollection)
      .doc(uid)
      .update({
        [task.id]: firebase.firestore.FieldValue.delete(),
      });
  };

  return { taskState, createTask, updateTask, deleteTask };
}
