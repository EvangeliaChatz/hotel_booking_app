

async function logOut(req, res){
    console.log("logout...", req.session);
    req.session.destroy((err) => {
      if (err) {
        res.redirect("/");
      }
      // res.redirect(req.get("referer"));
      res.redirect("/");
    });
  }

  export default logOut;