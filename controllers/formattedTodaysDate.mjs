//Μορφοποίηση ημερομηνίας για να μπει στην βάση postgres
function getTodaysDateFormatted() {
  let today = new Date();
  const bookingDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return bookingDate;
}

export default getTodaysDateFormatted;
