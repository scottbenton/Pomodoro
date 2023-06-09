import { Typography, Box } from "@mui/material";
import { ThemeBox } from "./ThemeBox";
import { useThemeStore } from "store/theme.store";
import {
  THEME_COLORS,
  THEME_TYPES,
  themeColors,
  themeTypes,
} from "providers/MuiThemeProvider/themes";

export function ThemeChange() {
  const { type, color, updateType, updateColor } = useThemeStore();

  return (
    <Box>
      <Typography variant={"h6"}>Theme Types</Typography>

      <Box display={"flex"} flexWrap={"wrap"}>
        {Object.keys(themeTypes).map((typeKey, index) => {
          const typedTypeKey = typeKey as THEME_TYPES;

          return (
            <ThemeBox
              key={index}
              color={themeTypes[typedTypeKey].backgroundColor}
              name={themeTypes[typedTypeKey].name}
              selected={typeKey === type}
              onClick={() => updateType(typedTypeKey)}
            />
          );
        })}
      </Box>
      <Box marginTop={4}>
        <Typography variant={"h6"}>Theme Colors</Typography>

        <Box display={"flex"} flexWrap={"wrap"}>
          {Object.keys(themeColors).map((colorKey, index) => {
            const typedColor = colorKey as THEME_COLORS;

            return (
              <ThemeBox
                key={index}
                color={themeColors[typedColor].mainValue}
                name={themeColors[typedColor].name}
                selected={colorKey === color}
                onClick={() => updateColor(typedColor)}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
