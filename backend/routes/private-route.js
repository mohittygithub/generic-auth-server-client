const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(400).json({ success: false, message: "Access Denied" });

  const finalToken = token.split("Bearer ").pop();
  console.log(finalToken);
  try {
    const verified = await jwt.verify(finalToken, process.env.JWT_SECRET);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};
