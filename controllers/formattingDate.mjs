
//Format date to insert in postgres database
function getDateFormatted(date) {
    // console.log(date)
    date = new Date(date);
  const bookingDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return bookingDate;
}

export default getDateFormatted;
