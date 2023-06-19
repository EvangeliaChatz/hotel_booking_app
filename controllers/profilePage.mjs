import * as model from "../model/model_pg.mjs";



async function profilePage(req, res)  {

model.getProfileBookings(res.locals.client_id, (err, bookingsEditdetailsrows) => {
  if (err) {
    return console.error(err.message);
  }

    // ReservationsLoad = reservationrows;
    console.log('ReservationsLoad',bookingsEditdetailsrows);
    res.render("profilePage", {
      // // ReservationsPostg: ReservationsLoad,
      BookingEditDetails : bookingsEditdetailsrows,
      // // reservationId: reservationrows[0].booking_id,
      // // reservationPrice: reservationrows[0].room_type_name,
      // // reservationDate: reservationrows[0].total_price,
      // // reservationDate: reservationrows[0].room_type_photo,
      // // resevationBreakfast: reservationrows[0].breakfast,
      // // resevationBreakfast: reservationrows[0].fastwifi,
       // // resevationBreakfast: reservationrows[0].arrival_date,
       // // resevationBreakfast: reservationrows[0].dep_date,
    });
  });
  }

  export default profilePage;