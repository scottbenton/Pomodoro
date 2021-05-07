import React, { useState } from "react";
import { Button, ButtonProps } from "@material-ui/core";
import { AuthDialog } from "./AuthDialog";

export const LoginButton: React.FC<ButtonProps> = (props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <>
      <Button {...props} onClick={() => setDialogOpen(true)}>
        Login
      </Button>
      <AuthDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} />
    </>
  );
};
