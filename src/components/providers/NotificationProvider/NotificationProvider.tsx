import React, { useCallback, useEffect, useRef, useState } from "react";
import { NotificationContext } from "./NotificationContext";

const notificationAudio = new Audio("/notification.mp3");

enum NOTIFICATION_PERMISSIONS {
  GRANTED = "granted",
  DEFAULT = "default",
  DENIED = "denied",
}

export const NotificationProvider: React.FC = (props) => {
  const { children } = props;

  const areNotificationsSupported = "Notification" in window;
  const areNotificationsAllowed = useCallback(() => {
    return areNotificationsSupported
      ? window.Notification.permission === NOTIFICATION_PERMISSIONS.GRANTED
      : false;
  }, [areNotificationsSupported]);

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    areNotificationsAllowed()
  );

  const [audioEnabled, setAudioEnabled] = useState<boolean>(
    window.localStorage.getItem("audioEnabled") === "true"
  );
  const toggleAudioEnabled = () => {
    setAudioEnabled((prevValue) => !prevValue);
  };

  useEffect(() => {
    window.localStorage.setItem("audioEnabled", audioEnabled + "");
  }, [audioEnabled]);

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
    if (areNotificationsSupported) {
      try {
        Notification.requestPermission().then(() => {
          setNotificationsEnabled(areNotificationsAllowed());
        });
      } catch (e) {
        Notification.requestPermission(() =>
          setNotificationsEnabled(areNotificationsAllowed())
        );
      }
    }
  };

  const notify = useCallback(
    (title: string, message: string) => {
      if (audioEnabled) {
        notificationAudio.play();
      }
      if (areNotificationsAllowed() && !isWindowFocused.current) {
        new Notification(title, { body: message });
      }
    },
    [areNotificationsAllowed, audioEnabled]
  );

  return (
    <NotificationContext.Provider
      value={{
        audioEnabled,
        toggleAudioEnabled,
        areNotificationsSupported,
        notificationsEnabled,
        notify,
        requestNotificationPermission,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
