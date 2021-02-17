export function convertMillisecondsToFriendlyTime(mills: number) {
  const seconds = Math.ceil(mills / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return { time: `${hours}: ${minutes}`, label: "" };
  } else if (minutes > 0) {
    return { time: minutes + "", label: "minute(s)" };
  } else {
    return { time: seconds + "", label: "second(s)" };
  }
}
