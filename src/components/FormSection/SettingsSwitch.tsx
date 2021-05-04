import React from "react";
import { Typography, Switch } from "@material-ui/core";
import { useStyles } from "./styles";
export interface SettingsSwitchProps {
  label: string;
  checked: boolean;
  handleToggle: (checked: boolean) => void;
}

export const SettingsSwitch: React.FC<SettingsSwitchProps> = (props) => {
  const { label, checked, handleToggle } = props;

  const classes = useStyles();

  return (
    <label className={classes.switchLabel}>
      <Typography variant={"body1"}>{label}</Typography>
      <Switch
        color={"primary"}
        checked={checked}
        onChange={(evt, checked) => handleToggle(checked)}
      />
    </label>
  );
};
