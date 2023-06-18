//Format date to insert in postgres database
// module.exports = {
//   getDateFormatted: function (date) {
//     date = new Date(date);
//     const bookingDate =
//       date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
//     return bookingDate;
//   }
// };

function getDateFormatted(date) {
    // console.log(date)
    date = new Date(date);
  const bookingDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return bookingDate;
}

export default getDateFormatted;
