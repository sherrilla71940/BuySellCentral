export function formatCurrentDateToYYYYMMDD() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since getMonth() returns zero-based month (0-11)
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

async function convertCreatedAtToYYYYMMDD(dateTimeString: string) {
  const formattedDate = dateTimeString.slice(0, 10);
  return formattedDate;
}
