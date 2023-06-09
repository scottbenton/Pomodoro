import { Typography, Switch, Box } from "@mui/material";

export interface SettingsSwitchProps {
  label: string;
  checked: boolean;
  handleToggle: (checked: boolean) => void;
}

export function SettingsSwitch(props: SettingsSwitchProps) {
  const { label, checked, handleToggle } = props;

  return (
    <Box
      component={"label"}
      sx={(theme) => ({
        display: "flex",
        width: "100%",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: theme.palette.background.default,
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
      })}
    >
      <Typography variant={"body1"}>{label}</Typography>
      <Switch
        color={"primary"}
        checked={checked}
        onChange={(_evt, checked) => handleToggle(checked)}
      />
    </Box>
  );
}
