import * as model from "../model/model_pg.mjs";

function editBooking(req, res) {
  // let clientId = 6;
  console.log(res.locals.client_id);

  // let ReservationsLoad;

  model.getReservations(res.locals.client_id, (err, reservationrows) => {
    // console.log(reservationrows);
    if (err) {
      return console.error(err.message);
    }

    // ReservationsLoad = reservationrows;
    console.log('ReservationsLoad',reservationrows);
    res.render("editBooking", {
      // // ReservationsPostg: ReservationsLoad,
      reservations : reservationrows,
      // // reservationId: reservationrows[0].booking_id,
      // // reservationPrice: reservationrows[0].total_price,
      // // reservationDate: reservationrows[0].booking_date,
      // // resevationBreakfast: reservationrows[0].breakfast,
      // // reservationFastwifi: reservationrows[0].fastwifi,
    });
  });
}
export default editBooking;
