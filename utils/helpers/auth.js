const jwt = require("jsonwebtoken");

const handleError = require("./handleError");
const config = require("../../config");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    // if token doesnt exist at all
    let error = handleError(res, 401, "Authetnication failed!");

    return next(error);
  }

  let decodedToken;

  try {
    // if token exists check its validity
    decodedToken = jwt.verify(token, config.secret);
  } catch (error) {
    res.status(401).json({ error: { message: "Authentication failed!" } });

    return next(error);
  }

  // attach user data on req
  req.userData = { userId: decodedToken.id };

  next();
};

module.exports = auth;
