import { createContext } from "react";

export interface INotificationContext {
  notify: (title: string, message: string) => void;
  requestNotificationPermission: () => void;
}

export const NotificationContext = createContext<INotificationContext>({
  notify: () => {},
  requestNotificationPermission: () => {},
});
