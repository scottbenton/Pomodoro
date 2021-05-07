import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNotificationSettings } from "../../../globalState/globalNotificationState";
import { NotificationContext } from "./NotificationContext";

// const notificationAudio = new Audio("/notification.mp3");

enum NOTIFICATION_PERMISSIONS {
  GRANTED = "granted",
  DEFAULT = "default",
  DENIED = "denied",
}

export const NotificationProvider: React.FC = (props) => {
  const { children } = props;

  const audioRef = useRef<HTMLAudioElement>(null);

  const notificationSettings = useNotificationSettings();
  const {
    notificationDecisionMade,
    notificationsEnabled,
    notificationsSupported,
    audioEnabled,
  } = notificationSettings;

  const isWindowFocused = useRef<boolean>(true);
  useEffect(() => {
    const handleFocus = () => (isWindowFocused.current = true);
    const handleBlur = () => (isWindowFocused.current = false);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const requestNotificationPermission = () => {
    if (notificationsSupported.get()) {
      try {
        Notification.requestPermission().then(() => {
          notificationsEnabled.set(
            window.Notification.permission === "granted"
          );
          notificationDecisionMade.set(
            window.Notification.permission !== "default"
          );
        });
      } catch (e) {
        Notification.requestPermission(() => {
          notificationsEnabled.set(
            window.Notification.permission === "granted"
          );
          notificationDecisionMade.set(
            window.Notification.permission !== "default"
          );
        });
      }
    }
  };
  const notify = useCallback(
    (title: string, message: string) => {
      if (audioEnabled.get()) {
        audioRef.current?.play();
      }
      if (notificationsEnabled.get() && !isWindowFocused.current) {
        new Notification(title, { body: message });
      }
    },
    [notificationsEnabled, audioEnabled]
  );

  return (
    <NotificationContext.Provider
      value={{
        notify,
        requestNotificationPermission,
      }}
    >
      <audio ref={audioRef}>
        <source src={"/notification.mp3"} />
      </audio>
      {children}
    </NotificationContext.Provider>
  );
};
