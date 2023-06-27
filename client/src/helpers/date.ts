type DateString = `${string}-${string}-${string}`;

// export function generateCurrentDateToYYYYMMDD() {
//   const currentDate = new Date();

//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since getMonth() returns zero-based month (0-11)
//   const day = String(currentDate.getDate()).padStart(2, "0");

//   const formattedDate = `${year}-${month}-${day}`;
//   console.log("formatted data", formattedDate);
//   return formattedDate;
// }

export function generateCurrentDateToYYYYMMDD() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log("formatted data", formattedDate);
  return formattedDate;
}

export function convertCreatedAtToYYYYMMDD(dateTimeString: string) {
  const formattedDateTime = dateTimeString.slice(0, 19);
  return formattedDateTime;
}

// export function getTimeDifference(
//   date1: DateString,
//   date2: DateString
// ): string {
//   const oneHour = 60 * 60 * 1000; // One hour in milliseconds

//   const firstDate = new Date(date1);
//   const secondDate = new Date(date2);

//   const diffMilliseconds = Math.abs(firstDate.getTime() - secondDate.getTime());
//   const diffHours = Math.round(diffMilliseconds / oneHour);

//   if (diffHours < 1) {
//     const diffMinutes = Math.round(diffMilliseconds / (60 * 1000));
//     return `${diffMinutes} minutes ago`;
//   } else if (diffHours < 24) {
//     return `${diffHours} hours ago`;
//   } else {
//     const diffDays = Math.round(diffHours / 24);
//     if (diffDays === 0) {
//       return "Today";
//     } else if (diffDays === 1) {
//       return "Yesterday";
//     } else {
//       return `${diffDays} days ago`;
//     }
//   }
// }

// export function generateTimeAgo(createdAt: string) {
//   const convertedCreatedAt = convertCreatedAtToYYYYMMDD(
//     createdAt
//   ) as DateString;
//   const convertedCurrentDate = generateCurrentDateToYYYYMMDD() as DateString;
//   return getTimeDifference(convertedCreatedAt, convertedCurrentDate);
// }
type DateString = `${string}-${string}-${string}`;

export function getTimeDifference(date: DateString): string {
  const oneMinute = 60 * 1000; // One minute in milliseconds
  const oneHour = 60 * oneMinute; // One hour in milliseconds
  const oneDay = 24 * oneHour; // One day in milliseconds

  const currentDate = new Date();
  const createdAt = new Date(date);

  const timeDifference = currentDate.getTime() - createdAt.getTime();

  if (timeDifference < oneMinute) {
    const diffSeconds = Math.round(timeDifference / 1000);
    if (diffSeconds === 1) return `${diffSeconds} second ago`;
    return `${diffSeconds} seconds ago`;
  } else if (timeDifference < oneHour) {
    const diffMinutes = Math.round(timeDifference / oneMinute);
    if (diffMinutes === 1) return `${diffMinutes} minute ago`;
    return `${diffMinutes} minutes ago`;
  } else if (timeDifference < oneDay) {
    const diffHours = Math.round(timeDifference / oneHour);
    if (diffHours === 1) return `${diffHours} hour ago`;
    return `${diffHours} hours ago`;
  } else {
    const diffDays = Math.round(timeDifference / oneDay);
    if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  }
}

export function generateTimeAgo(createdAt: string) {
  return getTimeDifference(createdAt as DateString);
}
