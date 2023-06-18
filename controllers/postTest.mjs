

//PARADEIGMA POST FORMAS--PROSTHETEI STOIXEIA STON PINAKA testform
function postTest(req, res){
    // console.log(res.locals.clientId);
    model.insertUser(
      req.body.fname,
      req.body.lname,
      res.locals.user_id,
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        res.render("test-view");
      }
    );
  }

  export default postTest;