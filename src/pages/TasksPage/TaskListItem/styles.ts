import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    "& > *": {
      marginLeft: theme.spacing(1),
    },
  },
  dot: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "50%",
    boxSizing: "border-box",
    display: "inline-block",
    marginRight: theme.spacing(0.5),
  },
  dueDate: {
    marginRight: theme.spacing(2),
  },
  editingListItem: {
    padding: theme.spacing(2),
  },
  completedTask: {
    textDecoration: "line-through",
  },
}));
