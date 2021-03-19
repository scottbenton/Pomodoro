export function convertMillisecondsToFriendlyTime(mills: number) {
    let remainingTime = mills;
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    remainingTime -= hours * (1000 * 60 * 60);
    const minutes = Math.floor((remainingTime + 500) / (1000 * 60));
    remainingTime -= minutes * (1000 * 60);
    const seconds = Math.ceil((remainingTime - 500) / 1000);

    if (hours > 0) {
        return { time: `${hours}: ${minutes}`, label: "" };
    } else if (minutes > 0) {
        return {
            time: (seconds > 30 ? minutes + 1 : minutes) + "",
            label: "minute(s)",
        };
    } else {
        return { time: seconds + "", label: "second(s)" };
    }
}
