import * as model from "../model/model_pg.mjs";

function getAvailableRooms(req, res) {
  //βάζω στο url τα δεδομένα της φόρμας
  res.locals.checkInDate = req.query.checkInDate;
  res.locals.checkOutDate = req.query.checkOutDate;
  res.locals.GuestNumber = req.query.GuestNumber;

  let GuestNumberControl = req.query.GuestNumber;

  model.getRoomGuestDate(
    GuestNumberControl,
    res.locals.checkInDate,
    res.locals.checkOutDate,
    (err, roomtyperows) => {
      // φορτώνω τον πίνακα roomΤypep
      if (err) {
        return console.error(err.message);
      }

      res.render("bookingList", {
        RoomTypePostgBookList: roomtyperows,
      });
    }
  );
}

export default getAvailableRooms;
