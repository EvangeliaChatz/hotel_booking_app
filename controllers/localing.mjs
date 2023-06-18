function localing(req, res, next) {
  if (req.session.signedIn) {
    res.locals.full_name = req.session.full_name;
    res.locals.signedIn = req.session.signedIn;
    res.locals.email = req.session.email;
    res.locals.phone_number = req.session.phone;
    res.locals.client_id = req.session.client_id;

    
  } else {
    res.locals.signedIn = false;
  }
  next();
}


export default localing;
