import * as model from "../model/model_pg.mjs";
import getDateFormatted from "./formattingDate.mjs";

function insertingIncludes(req, res, next) {
  model.insertIncludes(
    getDateFormatted(req.body.hiddenArrivalDate),
    getDateFormatted(req.body.hiddenDepDate),
    res.locals.booking_id,
    req.body.hiddenRoomId,
    (err, result) => {
      if (err) {
        return console.error(err);
        res.redirect(req.get("referer"));
      }
      next();
    }
  );
}

export default insertingIncludes;
