import { makeStyles, fade } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(1),
    flexGrow: 1,
    textDecoration: "none",
    color: fade(theme.palette.primary.contrastText, 0.75),
    maxWidth: 150,
    minWidth: 50,
    "&:hover": {
      backgroundColor: "#0003",
    },
  },
  selectedNavItem: {
    color: theme.palette.primary.contrastText,
    backgroundColor: "#0003",
  },
}));
