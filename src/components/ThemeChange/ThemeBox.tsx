import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import SelectedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import { useStyles } from "./styles";

export interface ThemeBoxProps {
  color: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

export const ThemeBox: React.FC<ThemeBoxProps> = (props) => {
  const { color, name, selected, onClick } = props;

  const classes = useStyles({ backgroundColor: color });

  return (
    <Box>
      <Typography variant={"subtitle2"} color={"textSecondary"}>
        {name}
      </Typography>
      <Button className={classes.themeBox} onClick={onClick}>
        {selected && <SelectedIcon />}
      </Button>
    </Box>
  );
};
