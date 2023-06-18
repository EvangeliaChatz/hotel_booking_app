
import * as model from "../model/model_pg.mjs";

async function signIn (req, res) {
    const email_req = req.body.email;
    const password_req = req.body.password;
    await model.checkUser(email_req, password_req, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect(req.get("referer"));
      } else {
        if (!result) {
          res.redirect("/");
        } else {
          // global variables of session
          req.session.signedIn = true;
          req.session.full_name = result.full_name;
          req.session.client_id = result.client_id;
          req.session.email = result.email;
          req.session.phone = result.phone_number;

          console.log(req.session.full_name, req.session.signedIn);
          res.redirect(req.get("referer"));
        }
      }
    });
  }

export default signIn;