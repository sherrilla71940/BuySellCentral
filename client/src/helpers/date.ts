type DateString = `${string}-${string}-${string}`;

export function generateCurrentDateToYYYYMMDD() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since getMonth() returns zero-based month (0-11)
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function convertCreatedAtToYYYYMMDD(dateTimeString: string) {
  const formattedDate = dateTimeString.slice(0, 10);
  return formattedDate;
}

export function getTimeDifference(
  date1: DateString,
  date2: DateString
): string {
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const diffDays = Math.round(
    Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
  );

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    return `${diffDays} days ago`;
  }
}

export function generateTimeAgo(createdAt: string) {
  const convertedCreatedAt = convertCreatedAtToYYYYMMDD(
    createdAt
  ) as DateString;
  const convertedCurrentDate = generateCurrentDateToYYYYMMDD() as DateString;
  return getTimeDifference(convertedCreatedAt, convertedCurrentDate);
}
