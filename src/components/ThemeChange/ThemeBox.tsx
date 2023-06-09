import { Box, Button, Typography } from "@mui/material";
import SelectedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

export interface ThemeBoxProps {
  color: string;
  name: string;
  selected: boolean;
  onClick: () => void;
}

export function ThemeBox(props: ThemeBoxProps) {
  const { color, name, selected, onClick } = props;

  return (
    <Box>
      <Typography variant={"subtitle2"} color={"textSecondary"}>
        {name}
      </Typography>
      <Button
        sx={(theme) => ({
          backgroundColor: color,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 1,
          width: 100,
          height: 60,
          borderRadius: theme.shape.borderRadius,
          marginRight: theme.spacing(2),
          "&:hover": {
            backgroundColor: color,
          },
          border: `1px solid ${theme.palette.divider}`,
          color: theme.palette.getContrastText(color),
        })}
        onClick={onClick}
      >
        {selected && <SelectedIcon />}
      </Button>
    </Box>
  );
}
