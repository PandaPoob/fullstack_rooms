export function formatDate(date: Date, eventDetail?: boolean) {
  const jsDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    jsDate
  );
  const time = jsDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (eventDetail) {
    const finalFormat = `${formattedDate} ${time}`;

    return finalFormat;
  } else {
    const finalFormat = `${time} - ${formattedDate}`;
    return finalFormat;
  }
}
