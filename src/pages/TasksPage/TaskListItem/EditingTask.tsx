import { TaskDTO } from "domain/TaskDTO";
import React from "react";
import {
  ListItem,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Button,
  Paper,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { TaskPriorities } from "domain/TaskPriorities";
import { useStyles } from "./styles";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";

export interface EditingTaskProps {
  task: TaskDTO;
  updateTask: (taskUpdates: Partial<TaskDTO>) => void;
  submitUpdates: () => void;
  deleteTask: () => void;
  cancelEditing: () => void;
}

export const EditingTask: React.FC<EditingTaskProps> = (props) => {
  const { task, updateTask, submitUpdates, deleteTask, cancelEditing } = props;
  const { task: taskString, dueDate, priority } = task;

  const classes = useStyles();

  return (
    <ListItem>
      <Paper className={classes.editingListItem}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              value={taskString ?? ""}
              onChange={(evt) => updateTask({ task: evt.target.value || null })}
              label={"Task Description"}
              variant={"filled"}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              value={dueDate ?? null}
              onChange={(newDueDate) => {
                let dueDate = undefined;
                if (newDueDate) {
                  dueDate = new Date(newDueDate);
                  dueDate.setUTCHours(0, 0, 0, 0);
                }
                updateTask({
                  dueDate,
                });
              }}
              label={"Due Date"}
              fullWidth
              inputVariant={"filled"}
              format={"MMM d, yyyy"}
              clearable
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={priority ?? 0}
              onChange={(evt) =>
                updateTask({
                  priority: parseInt(evt.target.value) ?? null,
                })
              }
              variant={"filled"}
              label={"Priority"}
              fullWidth
              select
            >
              <MenuItem value={0}>
                <i>No Priority</i>
              </MenuItem>
              {Object.values(TaskPriorities).map((priority, index) => (
                <MenuItem value={priority.value} key={index}>
                  <>
                    <span
                      style={{
                        backgroundColor: priority.color[500],
                      }}
                      className={classes.dot}
                    />
                    {priority.name}
                  </>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} className={classes.actions}>
            <IconButton onClick={deleteTask}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={cancelEditing}>
              <CancelIcon />
            </IconButton>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={submitUpdates}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </ListItem>
  );
};
