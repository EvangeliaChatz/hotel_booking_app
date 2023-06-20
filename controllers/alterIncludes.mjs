import * as model from "../model/model_pg.mjs";

function alterIncludes(req, res) {
  model.updateExtras(
    req.body.breakfastchange,
    req.body.fastwifichange,
    req.body.booking_idchange,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating extras");
      }
    }
  );

  res.redirect("/profilePage");
}
export default alterIncludes;
