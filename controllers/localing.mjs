function localing(req, res, next) {
  if (req.session.signedIn) {
    res.locals.full_name = req.session.full_name;
    res.locals.signedIn = req.session.signedIn;
    res.locals.email = req.session.email;
    
  } else {
    res.locals.signedIn = false;
  }
  next();
}


export default localing;
