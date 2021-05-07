import React from "react";
import firebase from "firebase";
import { useTasks } from "./useTasks";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Checkbox,
  Box,
  Divider,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { FullPageMessage } from "components/FullPageMessage";
import { TaskListItem } from "./TaskListItem";
import CreateIcon from "@material-ui/icons/AddRounded";

export interface TasksListProps {
  user: firebase.User;
}

export const TasksList: React.FC<TasksListProps> = (props) => {
  const { user } = props;

  const { taskState, createTask, updateTask, deleteTask } = useTasks(user.uid);

  if (taskState.error) {
    return (
      <FullPageMessage
        primaryText={"Error Loading Tasks"}
        secondaryText={taskState.error}
        flexGrow={1}
        justifyContent={"center"}
      />
    );
  }

  if (taskState.loading || !taskState.tasks) {
    return (
      <List>
        {new Array(3).map((val, index) => (
          <>
            <ListItem key={index}>
              <ListItemText primary={<Skeleton />} />
            </ListItem>
            <ListItemSecondaryAction>
              <Checkbox disabled edge={"end"} />
            </ListItemSecondaryAction>
          </>
        ))}
      </List>
    );
  }

  if (taskState.tasks.length === 0) {
    return (
      <FullPageMessage
        primaryText={"You have no pending tasks"}
        secondaryText={"Add a new task to get started"}
        actions={
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => createTask()}
          >
            Create Task
          </Button>
        }
        flexGrow={1}
        justifyContent={"center"}
      />
    );
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant={"h6"}>Your Tasks</Typography>
        <Button onClick={createTask} endIcon={<CreateIcon />}>
          New Task
        </Button>
      </Box>
      <Divider />
      <List>
        {taskState.tasks.map((task, index) => (
          <TaskListItem
            key={index}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </List>
    </>
  );
};
