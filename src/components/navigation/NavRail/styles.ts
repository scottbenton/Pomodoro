import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  rail: {
    width: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
  },
  widthFull: {
    width: "100%",
  },
  bottomSettings: {
    "& > *": {
      marginTop: theme.spacing(1),
    },
  },
}));
