import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  bottomNav: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
    height: 56,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    overflow: "hidden",
    flexShrink: 0,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavPlaceHolder: {
    height: 56,
    flexShrink: 0,
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
}));
