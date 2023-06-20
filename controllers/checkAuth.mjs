// κοιτάζει τα sessions, άμα ο χρήστης έχει συνδεθεί προχωράει στην επομένη ενέργεια αλλιώς επιστρέφει πάλι στην σελίδα που βρίσκοταν ήδη
function checkSignedIn(req, res, next) {
  if (req.session.signedIn) {
    next();
  } else {
    console.log("Not signed in");
    res.redirect(req.get("referer"));
  }
}

export default checkSignedIn;
