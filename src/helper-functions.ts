export const getTimeShort = (timeStamp: string) =>
  new Intl.DateTimeFormat("en-us", { timeStyle: "short", hourCycle: "h12" }).format(new Date(timeStamp));

export const getDateMedium = (timeStamp: string) =>
  new Intl.DateTimeFormat("en-us", { dateStyle: "medium" }).format(new Date(timeStamp));

export const getTimeDifferece = (timeStamp: string) => {
  const date = new Date(timeStamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Add the trailing zeros
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return { hoursStr, minutesStr, secondsStr };
}
