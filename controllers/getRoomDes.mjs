
import * as model from "../model/model_pg.mjs";

function getRoomDes (req, res) {
    let RoomTypeLoadDes;
    let id = req.query.roomTypeId;
  
    model.getRooms(id, (err, roomtyperows) => {
      // φορτώνω τον πίνακα roomΤypep
  
      if (err) {
        return console.error(err.message);
      }
      RoomTypeLoadDes = roomtyperows;
      res.render("productDescription", {
        RoomTypePostgDes: RoomTypeLoadDes[0],
        GuestNumber: roomtyperows[0].quests_amount,
        TypeRoomPrice: roomtyperows[0].room_type_price,
        PhotoRoomType: roomtyperows[0].room_type_photo,
        RoomTypeName: roomtyperows[0].room_type_name,
      }); //τις τιμές που παίρνω από τη βάση τις περνάω στο home.hbs για να τραξβήξω από τη βάση τα δεδομένα με το object RoomTypeLoadDes
    });
  }
  export default getRoomDes;