import * as model from "../model/model_pg.mjs";

function writeReview(req, res) {
  // φορτώνω τον πίνακα roomΤypep-για να εμφανιστούν τα δωμάτια στην αρχική σελίδα
  let RoomTypeLoadDesReview;
  let id = req.query.roomTypeId;
  model.getRooms(id, (err, roomtyperows) => {
    if (err) {
      return console.error(err.message);
    }
    RoomTypeLoad = roomtyperows;
    // console.log(RoomTypeLoad[0]);
    res.render("WriteComment", { RoomTypePostg: RoomTypeLoadDesReview[0] }); //τις τιμές που παίρνω από τη βάση τις περνάω στο home.hbs για να τραξβήξω από τη βάση τα δεδομένα με το object RoomTypeLoad
  });
}

export default writeReview;
