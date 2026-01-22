const isAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      message: "Login required",
    });
  }

  next();
};

export default isAuth;
