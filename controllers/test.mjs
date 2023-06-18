import * as model from "../model/model_pg.mjs";


// SYNARTISI--- PARADEIGMA GET FORMAS--STOIXEIA PINAKA testform
function test (req, res) {
    model.loadTest((err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("test-view");
      // console.log(res.rows);
    });
  };
export default test;