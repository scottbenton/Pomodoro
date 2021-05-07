import { PomodoroPage } from "./PomodoroPage";
import PomodoroIcon from "@material-ui/icons/TimerRounded";
import { PomodoroSettings } from "./PomodoroPage/PomodoroSettings";

import { TasksPage } from "./TasksPage";
import TaskIcon from "@material-ui/icons/CheckCircleRounded";

import { ProfilePage } from "./ProfilePage";
import ProfileIcon from "@material-ui/icons/PersonRounded";

import { SvgIconProps } from "@material-ui/core";
export interface PageProps {}

export interface RouteConfig {
  url: string;
  component: React.FC<PageProps>;
  title?: string;
  Icon?: React.FC<SvgIconProps>;
  settingsComponent?: React.ReactNode;
  hideOnDesktop?: boolean;
}

export const routes: { [key: string]: RouteConfig } = {
  pomodoro: {
    url: "/",
    title: "Pomodoro",
    Icon: PomodoroIcon,
    component: PomodoroPage,
    settingsComponent: <PomodoroSettings />,
  },
  tasks: {
    url: "/tasks",
    title: "Tasks",
    Icon: TaskIcon,
    component: TasksPage,
  },
  profile: {
    url: "/profile",
    title: "Profile",
    Icon: ProfileIcon,
    component: ProfilePage,
    hideOnDesktop: true,
  },
};
