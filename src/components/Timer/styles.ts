import { fade, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  progressBackground: {
    color: fade(theme.palette.grey[500], 0.25),
  },
  progressForeground: {
    top: 0,
    position: "absolute",
  },
}));
