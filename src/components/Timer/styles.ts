import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  progressBackground: {
    color: theme.palette.grey[400],
  },
  progressForeground: {
    top: 0,
    position: "absolute",
  },
}));
