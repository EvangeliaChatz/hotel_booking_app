import * as model from "../model/model_pg.mjs";

function editBooking(req, res) {
  let clientId = 6;
  console.log(clientId);
  let reservationrows;
  let ReservationsLoad;

  model.getReservations(clientId, (err, reservationrows) => {
    // console.log(reservationrows);
    if (err) {
      return console.error(err.message);
    }

ReservationsLoad = reservationrows;
console.log(ReservationsLoad);
  res.render("editBooking" ,{
    ReservationsPostg: ReservationsLoad,
    reservationId: reservationrows[0].booking_id,
    reservationPrice: reservationrows[0].total_price,
    reservationDate: reservationrows[0].booking_date,
    resevationBreakfast: reservationrows[0].breakfast,
    reservationFastwifi: reservationrows[0].fastwifi}

  );
});
}
export default editBooking;