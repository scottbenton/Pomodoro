import { Typography, Box } from "@material-ui/core";
import React from "react";
import { useThemeSettings } from "../../globalState/globalThemeState";
import {
  THEME_COLORS,
  themeColors,
  THEME_TYPES,
  themeTypes,
} from "../providers/MuiThemeProvider/themes";
import { ThemeBox } from "./ThemeBox";

export interface ThemeChangeProps {}

export const ThemeChange: React.FC<ThemeChangeProps> = (props) => {
  const themeSettings = useThemeSettings();

  const selectedType = themeSettings.get().type;
  const selectedColor = themeSettings.get().color;

  const updateType = (newType: THEME_TYPES) => {
    themeSettings.set((prevSettings) => {
      let newSettings = { ...prevSettings };
      newSettings.type = newType;
      return newSettings;
    });
  };

  const updateColor = (newColor: THEME_COLORS) => {
    themeSettings.set((prevSettings) => {
      let newSettings = { ...prevSettings };
      newSettings.color = newColor;
      return newSettings;
    });
  };

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
              selected={typeKey === selectedType}
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
                selected={colorKey === selectedColor}
                onClick={() => updateColor(typedColor)}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
