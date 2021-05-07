import React, { useState, useEffect } from "react";
import { TaskDTO } from "domain/TaskDTO";
import {
  ListItem,
  IconButton,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { TaskPriorities } from "domain/TaskPriorities";
import { useStyles } from "./styles";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import { Task } from "./Task";
import { EditingTask } from "./EditingTask";
interface TaskListItemProps {
  task: TaskDTO;
  updateTask: (updatedTask: TaskDTO) => void;
  deleteTask: (task: TaskDTO) => void;
}

export const TaskListItem: React.FC<TaskListItemProps> = (props) => {
  const { task, updateTask, deleteTask } = props;
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState<boolean>(!task.task);
  const [taskUpdates, setTaskUpdates] = useState<TaskDTO>(task);

  const updateTaskUpdates = (updates: Partial<TaskDTO>) => {
    setTaskUpdates((prevTaskUpdates) => {
      return { ...prevTaskUpdates, ...updates };
    });
  };

  useEffect(() => {
    setTaskUpdates(task);
  }, [task]);

  const handleToggle = () => {
    updateTaskUpdates({ completed: true });
    let newTask = { ...task };
    newTask.completed = !newTask.completed;

    if (newTask.completed) {
      newTask.completedDate = new Date();
    } else {
      newTask.completedDate = null;
    }

    updateTask(newTask);
  };

  const handleSubmit = () => {
    updateTask(taskUpdates);
    setIsEditing(false);
  };
  const handleDelete = () => {
    deleteTask(taskUpdates);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditingTask
        task={taskUpdates}
        updateTask={updateTaskUpdates}
        submitUpdates={handleSubmit}
        deleteTask={handleDelete}
        cancelEditing={() => setIsEditing(false)}
      />
    );
  }
  return (
    <Task
      task={taskUpdates}
      handleEdit={() => setIsEditing(true)}
      handleToggle={handleToggle}
    />
  );
};
