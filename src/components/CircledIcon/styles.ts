import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  taskIcon: {
    borderRadius: 999,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    display: "flex",
  },
}));
