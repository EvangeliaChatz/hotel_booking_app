async function referer(req, res) {
  res.redirect(req.get("referer"));
}

export default referer;
