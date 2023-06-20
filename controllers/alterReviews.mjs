import * as model from "../model/model_pg.mjs";

function alterReviews(req, res) {
  model.updateExtras2(
    req.body.reviews,
    req.body.booking_idchange,
    console.log(req.body.reviews),
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating extras");
      }
    }
  );
  res.redirect("/profilePage");
}
export default alterReviews;
