import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    margin: theme.spacing(0.3),
  },
  dotFilled: {
    backgroundColor: theme.palette.primary.main,
  },
  dotUnfilled: {
    backgroundColor: theme.palette.grey[500],
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
}));
