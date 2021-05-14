import { Box } from "@material-ui/core";
import { useWakelock } from "hooks/useWakelock";
import { Switch, Route } from "react-router-dom";
import { routes } from "pages/routes";
import { useIsMobile } from "hooks/useIsMobile";
import { useStyles } from "./styles";
import { Contents, NavRail, BottomNav } from "components/navigation";

function App() {
  const classes = useStyles();

  useWakelock();
  const isMobile = useIsMobile();

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      className={isMobile ? classes.rootMobile : classes.rootDesktop}
    >
      {!isMobile && <NavRail />}
      <Switch>
        {Object.values(routes).map((route, index) => (
          <Route exact key={index} path={route.url}>
            <Contents config={route} isMobile={isMobile} />
          </Route>
        ))}
      </Switch>
      {isMobile && <BottomNav />}
    </Box>
  );
}

export default App;
