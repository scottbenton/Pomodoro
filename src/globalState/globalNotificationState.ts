import { createState, useState } from "@hookstate/core";
import { Persistence } from "@hookstate/persistence";

interface INotificationState {
  audioEnabled: boolean;
  notificationsSupported: boolean;
  notificationsEnabled: boolean;
  notificationDecisionMade: boolean;
}

const notificationsSupported = "Notification" in window;

const notificationsEnabled = notificationsSupported
  ? window.Notification.permission === "granted"
  : false;

const notificationDecisionMade = notificationsSupported
  ? window.Notification.permission === "default"
  : false;

const notificationState = createState<INotificationState>({
  audioEnabled: true,
  notificationsSupported,
  notificationsEnabled,
  notificationDecisionMade,
});

notificationState.attach(Persistence("notification-settings-key"));

export const useNotificationSettings = () => useState(notificationState);
