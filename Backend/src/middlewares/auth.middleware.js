const jwt = require("jsonwebtoken");

async function identifyingUser(req, res, next) {
  const token = req.cookies.login_token;

  if (!token) {
    return res.status(409).json({
      message: "Token is not valid",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  req.user = decoded;
  next();
}

module.exports = identifyingUser;