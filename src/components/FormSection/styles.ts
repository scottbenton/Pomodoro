import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
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
  settingsSectionTitle: {
    lineHeight: 1.2,
  },
  settingsSectionContent: {
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
}));
