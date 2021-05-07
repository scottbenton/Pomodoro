import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  actions: {
    "& > *": {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
  },
}));
