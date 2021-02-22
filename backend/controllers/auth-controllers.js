const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const shortId = require("shortid");

// register/signup controller
exports.register = async (req, res, next) => {
  const isUserExists = await User.findOne({ email: req.body.email });
  if (isUserExists)
    return res.json({ success: false, error: "Email already exists" });

  const { name, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const username = shortId.generate();
  const profile = `${process.env.CLIENT_URL}/profile/${username}`;

  try {
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      profile: profile,
      username: username,
    });

    const savedUser = await user.save();

    // res.status(201).json({
    //   success: true,
    //   message: {
    //     _id: savedUser._id,
    //     name: savedUser.name,
    //     profile: savedUser.profile,
    //   },
    // });
    res.status(201).json({
      success: true,
      message: "User created successfully!! Please sign in",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// login controller
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: "Invalid username or password" });

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword)
      return res
        .status(400)
        .json({ success: false, error: "Invalid Password" });

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, name, email, role, username } = user;
    res.status(200).json({
      success: true,
      jwt: token,
      user: { _id, name, email, username, role },
    });
  } catch (error) {
    res.send(error.message);
  }
};

// signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.test = (req, res, next) => {
  res.send("test");
};
