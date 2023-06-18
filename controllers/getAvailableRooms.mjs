import * as model from "../model/model_pg.mjs";

function getAvailableRooms(req, res) {
    //βάζω στο url τα δεδομένα της φόρμας
    res.locals.checkInDate = req.query.checkInDate;
    res.locals.checkOutDate = req.query.checkOutDate;
    res.locals.GuestNumber = req.query.GuestNumber;
  
    let GuestNumberControl = req.query.GuestNumber;
    let RoomTypeLoadBookList;
  
    model.getRoomGuestDate(GuestNumberControl, (err, roomtyperows) => {
      // φορτώνω τον πίνακα roomΤypep
      if (err) {
        return console.error(err.message);
      }
      RoomTypeLoadBookList = roomtyperows;
  
      res.render("bookingList", {
        RoomTypePostgBookList: RoomTypeLoadBookList,
        GuestNumber: roomtyperows[0].quests_amount,
        TypeRoomPrice: roomtyperows[0].room_type_price,
        PhotoRoomType: roomtyperows[0].room_type_photo,
        RoomTypeName: roomtyperows[0].room_type_name,
      });
    });
  }

  export default getAvailableRooms;