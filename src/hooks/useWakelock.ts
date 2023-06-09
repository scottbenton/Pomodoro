import { useEffect } from "react";
import { usePomodoroSettings } from "store/pomodoro-settings.store";

export function useWakelock() {
  const keepScreenOnDuringCycles = usePomodoroSettings(
    (store) => store.keepScreenOnDuringCycles
  );
  const wakeLocksSupported = "wakeLock" in navigator;

  useEffect(() => {
    // Visibility change listener
    const handleVisibilityChange = async () => {
      try {
        console.debug("Requesting wakeLock...");
        const wakeLock = await (navigator as any).wakeLock.request("screen");
        wakeLock.addEventListener("release", () => {
          console.debug("Wake Lock Released:", wakeLock.released);
        });
      } catch (err: any) {
        console.error(`${err?.name}, ${err?.message}`);
      }
    };

    if (keepScreenOnDuringCycles && wakeLocksSupported) {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [keepScreenOnDuringCycles, wakeLocksSupported]);
}
