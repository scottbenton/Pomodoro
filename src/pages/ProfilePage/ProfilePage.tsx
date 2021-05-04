import { LoginButton } from "components/User/LoginButton";
import { LogoutButton } from "components/User/LogoutButton";
import { useUser } from "hooks/useUser";
import { PageProps } from "pages/routes";
import { Typography, Box } from "@material-ui/core";
import React from "react";
import { FormSection } from "components/FormSection";
import { UserAvatar } from "components/User/UserAvatar";
import { useStyles } from "./styles";

export const ProfilePage: React.FC<PageProps> = (props) => {
  const classes = useStyles();

  const user = useUser();

  return (
    <FormSection title={"Authentication"}>
      {user ? (
        <>
          <Box display={"flex"} alignItems={"center"}>
            <UserAvatar />
            <Typography className={classes.profileText}>
              You are logged in as {user.displayName}.
            </Typography>
          </Box>
          <LogoutButton variant={"contained"} color={"primary"} />
        </>
      ) : (
        <LoginButton variant={"contained"} color={"primary"} />
      )}
    </FormSection>
  );
};
