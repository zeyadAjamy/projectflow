export const getTimeShort = (timeStamp: string) =>
  new Intl.DateTimeFormat("en-us", { timeStyle: "short", hourCycle: "h12" }).format(new Date(timeStamp));

export const getDateMedium = (timeStamp: string) =>
  new Intl.DateTimeFormat("en-us", { dateStyle: "medium" }).format(new Date(timeStamp));
