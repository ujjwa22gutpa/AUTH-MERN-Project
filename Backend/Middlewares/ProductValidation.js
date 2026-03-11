const jwt = require("jsonwebtoken");

const ensureValidation = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorised, JWT Token is reuired",
      success: false,
    });
  }

  try {
    const token = auth.startsWith("Bearer") ? auth.slice(7) : auth;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorised, JWT Token is expired",
      success: false,
    });
  }
};

module.exports = ensureValidation;