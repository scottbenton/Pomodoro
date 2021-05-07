import React from "react";
import {
  Box,
  Typography,
  Button,
  ButtonProps,
  BoxProps,
} from "@material-ui/core";
import { useStyles } from "./styles";

export interface FullPageMessageProps extends BoxProps {
  image?: React.ReactNode;
  primaryText: string;
  secondaryText?: string;
  actions?: React.ReactNode;
}

export const FullPageMessage: React.FC<FullPageMessageProps> = (props) => {
  const { image, primaryText, secondaryText, actions, ...boxProps } = props;

  const classes = useStyles();

  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      {...boxProps}
    >
      {image}
      <Typography variant={"h4"}>{primaryText}</Typography>
      {secondaryText && (
        <Typography variant={"h5"} color={"textSecondary"}>
          {secondaryText}
        </Typography>
      )}
      <Box display={"flex"} flexWrap={"wrap"} className={classes.actions}>
        {actions}
      </Box>
    </Box>
  );
};
