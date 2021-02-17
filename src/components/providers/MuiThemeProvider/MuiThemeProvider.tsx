import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

export const MuiThemeProvider: React.FC = (props) => {
  const { children } = props;

  const theme = createMuiTheme({
    typography: {
      fontFamily: ["nunito", "Arial", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
