import { createContext } from "react";

export interface INotificationContext {
  notify: (title: string, message: string) => void;
  audioEnabled: boolean;
  toggleAudioEnabled: () => void;
  requestNotificationPermission: () => void;
  areNotificationsSupported: boolean;
  notificationsEnabled: boolean;
}

export const NotificationContext = createContext<INotificationContext>({
  notify: () => {},
  audioEnabled: true,
  toggleAudioEnabled: () => {},
  requestNotificationPermission: () => {},
  areNotificationsSupported: false,
  notificationsEnabled: true,
});
