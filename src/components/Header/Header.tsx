import { Box, Typography } from "@mui/material";
import { DrawerToggle } from "components/DrawerToggle";
import { ThemeChange } from "components/ThemeChange";
import ThemeIcon from "@mui/icons-material/FormatPaintRounded";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import { PomodoroSettings } from "pages/PomodoroPage/PomodoroSettings";

export function Header() {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={[2, 4]}
      py={1}
      color={(theme) => theme.palette.primary.contrastText}
    >
      <Typography variant={"h5"} fontWeight={700}>
        Pomodoro Timer
      </Typography>
      <Box>
        <DrawerToggle
          title={"Update Pomodoro Settings"}
          icon={<SettingsIcon />}
          drawerContent={<PomodoroSettings />}
        />
        <DrawerToggle
          title={"Change your Theme"}
          icon={<ThemeIcon />}
          drawerContent={<ThemeChange />}
        />
      </Box>
    </Box>
  );
}
