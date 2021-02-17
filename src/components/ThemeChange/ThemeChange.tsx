import { Typography, Box } from "@material-ui/core";
import React from "react";
import {
  THEME_COLORS,
  THEME_TYPES,
} from "../providers/MuiThemeProvider/themes";
import { useThemeChanger } from "../providers/MuiThemeProvider/useThemeChanger";
import { ThemeBox } from "./ThemeBox";

export interface ThemeChangeProps {}

export const ThemeChange: React.FC<ThemeChangeProps> = (props) => {
  const {
    types,
    selectedType,
    changeThemeType,
    colors,
    selectedColor,
    changeColor,
  } = useThemeChanger();
  return (
    <Box>
      <Typography variant={"h6"}>Theme Types</Typography>

      <Box display={"flex"} flexWrap={"wrap"}>
        {Object.keys(types).map((typeKey, index) => (
          <ThemeBox
            key={index}
            color={types[typeKey].backgroundColor}
            name={types[typeKey].name}
            selected={typeKey === selectedType}
            onClick={() => changeThemeType(typeKey as THEME_TYPES)}
          />
        ))}
      </Box>
      <Box marginTop={4}>
        <Typography variant={"h6"}>Theme Colors</Typography>

        <Box display={"flex"} flexWrap={"wrap"}>
          {Object.keys(colors).map((colorKey, index) => (
            <ThemeBox
              key={index}
              color={colors[colorKey].mainValue}
              name={colors[colorKey].name}
              selected={colorKey === selectedColor}
              onClick={() => changeColor(colorKey as THEME_COLORS)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
