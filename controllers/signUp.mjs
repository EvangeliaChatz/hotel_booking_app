import * as model from "../model/model_pg.mjs";

async function signUp(req, res) {
  const email_req = req.body.email;
  const password_req = req.body.password;
  const full_name_req = req.body.full_name;
  const phone_req = req.body.phone_number;
  console.log("sign up process");

  await model.checkEmail(email_req, (err, result) => {
    if (err) {
      console.log(err);
      res.redirect(req.get("referer"));
    } else {
      if (!result) {
        // Result == null so we can create a new user
        model.addUser(
          full_name_req,
          email_req,
          password_req,
          phone_req,
          (err,result) => {
            if (err) {
              console.log(err);
              res.redirect(req.get("referer"));
            } else {
              // success message , user created
              req.session.signedIn = true;
              req.session.full_name = result.full_name;
              req.session.client_id = result.client_id;
              console.log(req.session.full_name, req.session.signedIn);
              res.redirect(req.get("referer"));
            }
          }
        );
      } else {
        // error message , user exists
        console.log("User already exists");
        res.redirect(req.get("referer"));
      }
    }
  });
}

export default signUp;
