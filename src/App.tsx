import { PomodoroPage } from "pages/PomodoroPage";
import { Box, Container, Paper } from "@mui/material";
import { Header } from "components/Header/Header";
import { useWakelock } from "hooks/useWakelock";
import { useThemeStore } from "store/theme.store";
import { THEME_TYPES } from "providers/MuiThemeProvider/themes";

export function App() {
  useWakelock();

  const isBlackTheme = useThemeStore(
    (store) => store.type === THEME_TYPES.BLACK
  );

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      bgcolor={(theme) =>
        isBlackTheme
          ? theme.palette.background.default
          : theme.palette.primary.dark
      }
    >
      <Container
        maxWidth={"lg"}
        sx={(theme) => ({
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down("sm")]: {
            px: 0,
          },
        })}
      >
        <Header />
        <Paper
          sx={(theme) => ({
            flexGrow: 1,
            display: "flex",
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.background.paper
                : theme.palette.background.default,

            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            p: 4,

            [theme.breakpoints.down("sm")]: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              p: 2,
            },
          })}
        >
          <PomodoroPage />
        </Paper>
      </Container>
    </Box>
  );
}
