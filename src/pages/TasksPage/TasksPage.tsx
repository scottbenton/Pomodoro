import { useUser } from "hooks/useUser";
import React from "react";
import { PageProps } from "../routes";
import { LoginButton } from "components/User/LoginButton";
import { FullPageMessage } from "components/FullPageMessage";
import { TasksList } from "./TasksList";
import { Container } from "@material-ui/core";
export const TasksPage: React.FC<PageProps> = (props) => {
  const user = useUser();

  return (
    <Container maxWidth={"sm"}>
      {user ? (
        <TasksList user={user} />
      ) : (
        <FullPageMessage
          primaryText={"Please login to track your tasks"}
          actions={<LoginButton color={"primary"} variant={"contained"} />}
          flexGrow={1}
          justifyContent={"center"}
        />
      )}
    </Container>
  );
};
