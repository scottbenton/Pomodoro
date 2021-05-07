import { Avatar, ButtonBase } from "@material-ui/core";
import React from "react";
import BlankIcon from "@material-ui/icons/Person";
import { useUser } from "hooks/useUser";
import { Link } from "react-router-dom";
import { useStyles } from "./styles";

interface UserAvatarProps {
  linkTo?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const { linkTo } = props;
  const classes = useStyles();

  let AvatarWrapper: React.FC = ({ children }) => <>{children}</>;
  if (linkTo) {
    AvatarWrapper = ({ children }) => (
      <ButtonBase component={Link} to={linkTo} className={classes.avatarButton}>
        {children}
      </ButtonBase>
    );
  }

  const user = useUser();
  if (!user || (!user.displayName && !user.photoURL)) {
    return (
      <AvatarWrapper>
        <Avatar>
          <BlankIcon />
        </Avatar>
      </AvatarWrapper>
    );
  }
  return (
    <AvatarWrapper>
      <Avatar
        src={user.photoURL ?? undefined}
        alt={user.displayName ?? "User Image"}
      >
        {user.displayName ? user.displayName[0] : ""}
      </Avatar>
    </AvatarWrapper>
  );
};
