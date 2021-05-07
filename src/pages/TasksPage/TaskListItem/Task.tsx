import { TaskDTO } from "domain/TaskDTO";
import React from "react";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditRounded";
import { useStyles } from "./styles";
import { TaskPriorities } from "domain/TaskPriorities";

interface TaskProps {
  task: TaskDTO;
  handleEdit: () => void;
  handleToggle: () => void;
}

export const Task: React.FC<TaskProps> = (props) => {
  const { task, handleEdit, handleToggle } = props;
  const classes = useStyles();

  const { completed, task: taskString, dueDate, priority } = task;
  return (
    <ListItem button onClick={handleToggle}>
      <ListItemIcon>
        <Checkbox color={"primary"} checked={completed} edge={"start"} />
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          className: completed ? classes.completedTask : "",
        }}
        primary={taskString ?? "No Information Saved"}
        secondary={
          (priority || dueDate) && (
            <Box display={"flex"} component={"span"}>
              {dueDate && (
                <span className={classes.dueDate}>
                  {dueDate?.toLocaleDateString()}
                </span>
              )}
              {priority ? (
                <span>
                  <span
                    style={{
                      backgroundColor: TaskPriorities[priority].color[500],
                    }}
                    className={classes.dot}
                  />
                  {TaskPriorities[priority ?? 0]?.name ?? ""}
                </span>
              ) : null}
            </Box>
          )
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge={"end"} onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
