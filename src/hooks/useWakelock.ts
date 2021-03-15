import { useWakelockSettings } from "globalState/globalWakelockState";
import { useEffect } from "react";

export function useWakelock() {
    const { wakelocksEnabled, wakelocksSupported } = useWakelockSettings();

    useEffect(() => {
        wakelocksSupported.set("wakeLock" in navigator);
    }, [wakelocksSupported]);

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

        if (wakelocksEnabled.get() && wakelocksSupported.get()) {
            document.addEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        }

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [wakelocksEnabled, wakelocksSupported]);
}
