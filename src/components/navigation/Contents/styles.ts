import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  contents: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  paperMobile: {
    borderRadius: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(6),
    zIndex: 2,
    padding: theme.spacing(2),
  },
  paperDesktop: {
    borderRadius: 0,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    color: theme.palette.primary.contrastText,
  },
  headerMobile: {
    position: "fixed",
    width: "100%",
    zIndex: 1,
  },
}));
