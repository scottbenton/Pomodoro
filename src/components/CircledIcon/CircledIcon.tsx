import React from "react";
import { useStyles } from "./styles";

export interface CircledIconProps {}

export const CircledIcon: React.FC<CircledIconProps> = (props) => {
  const { children } = props;

  const classes = useStyles();

  return <div className={classes.taskIcon}>{children}</div>;
};
