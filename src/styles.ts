import { makeStyles, fade } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  rootDesktop: {
    backgroundColor: theme.palette.primary.main,
    flexDirection: "row",
  },
  rootMobile: {
    backgroundColor: theme.palette.primary.main,
    flexDirection: "column",
  },
}));
