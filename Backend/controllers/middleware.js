const isAuth = (req, res, next) => {
  console.log("SESSION IN isAuth:", req.session);

  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Login Required" });
  }

  next();
};

export default isAuth;
