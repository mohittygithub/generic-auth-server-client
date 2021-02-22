const express = require("express");
const {
  register,
  login,
  signout,
  test,
} = require("../controllers/auth-controllers.js");
const verify = require("../routes/private-route");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/signout", signout);
router.get("/test", verify, test);

module.exports = router;
