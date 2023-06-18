
import * as model from "../model/model_pg.mjs";


function homepage (req, res) {
    // φορτώνω τον πίνακα roomΤypep-για να εμφανιστούν τα δωμάτια στην αρχική σελίδα
    let RoomTypeLoad;
    model.getRoomDesc((err, roomtyperows) => {
      if (err) {
        return console.error(err.message);
      }
      RoomTypeLoad = roomtyperows;
      // console.log(RoomTypeLoad[0]);
      
      res.render("home", { RoomTypePostg: RoomTypeLoad }); //τις τιμές που παίρνω από τη βάση τις περνάω στο home.hbs για να τραξβήξω από τη βάση τα δεδομένα με το object RoomTypeLoad
    });
  }
  export default homepage;