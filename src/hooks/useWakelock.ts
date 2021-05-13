import { usePomodoroSettingsState } from "globalState/globalPomodoroSettings";
import { useEffect } from "react";

export function useWakelock() {
  const { keepScreenOnDuringCycles } = usePomodoroSettingsState();
  const wakeLocksEnabled = keepScreenOnDuringCycles.get();
  const wakeLocksSupported = "wakeLock" in navigator;

  useEffect(() => {
    // Visibility change listener
    const handleVisibilityChange = async () => {
      try {
        console.debug("Requesting wakeLock...");
        const wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
          console.debug("Wake Lock Released:", wakeLock.released);
        });
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    if (wakeLocksEnabled && wakeLocksSupported) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [wakeLocksEnabled, wakeLocksSupported]);
}
