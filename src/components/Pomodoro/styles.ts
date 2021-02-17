import { fade, makeStyles } from "@material-ui/core";

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
    backgroundColor: fade(theme.palette.grey[500], 0.25),
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  switchLabel: {
    display: "flex",
    width: "100%",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
}));
