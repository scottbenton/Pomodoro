import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  contents: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(4),
  },
  paper: {
    borderRadius: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 24,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    color: theme.palette.primary.contrastText,
  },
}));
