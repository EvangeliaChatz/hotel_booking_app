import * as model from "../model/model_pg.mjs";
import getTodaysDateFormatted from "../controllers/formattedTodaysDate.mjs";

function saveBooking(req, res, next) {
  let bookingDate = getTodaysDateFormatted();

  let totalPrice = parseInt(req.body.hiddenPrice);

  // εχουν σιγουρα μπει στο request ?
  let breakfast = req.body.hiddenBreakfast;
  let fastwifi = req.body.hiddenWifi;

  model.insertBooking(
    totalPrice,
    bookingDate,
    req.session.client_id,
    breakfast,
    fastwifi,
    (err, result) => {
      if (err) {
        return console.error(err);
        // res.redirect(req.get("referer"));
      }
      res.locals.booking_id = result;
      // console.log(`booking id is ${res.locals.booking_id}`);
      next();
    }
  );
}

export default saveBooking;
