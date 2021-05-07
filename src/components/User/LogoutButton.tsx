import React from "react";
import { Button, ButtonProps } from "@material-ui/core";
import firebase from "firebase";

export const LogoutButton: React.FC<ButtonProps> = (props) => {
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <Button {...props} onClick={handleLogout}>
      Logout
    </Button>
  );
};
