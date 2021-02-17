import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  themeBox: (props: { backgroundColor: string }) => ({
    backgroundColor: props.backgroundColor,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 1,
    width: 100,
    height: 60,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: props.backgroundColor,
    },
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.getContrastText(props.backgroundColor),
  }),
}));
