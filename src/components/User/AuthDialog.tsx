import {
  Dialog,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { FirebaseLogin } from "./FirebaseLogin";

export interface AuthDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = (props) => {
  const { open, handleClose } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <Box py={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={3}
        >
          <Typography variant={"h6"}>Login or Sign Up</Typography>
          <Box pl={2}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <FirebaseLogin />
      </Box>
    </Dialog>
  );
};
