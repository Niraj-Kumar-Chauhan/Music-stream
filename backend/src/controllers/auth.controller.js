const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//* User Register Feature
async function registerUser(req, res) {
  const { username, email, password, role = "user" } = req.body;
  console.log('In register code')
  console.log("username = ", username, "  email = ", email, "role = ", role);

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "user already exist with this username or email",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
  httpOnly: true,      // JS se access nahi hoga (secure)
  secure: false,       // true only in production (HTTPS)
  sameSite: "lax",     // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

  return res.status(201).json({
    message: "user created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token
      
    },
  });
}

//* User Login Feature
async function loginUser(req, res) {
  const { nameOrEmail, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: nameOrEmail }, { email: nameOrEmail }],
  });

  if (!user) {
    return res.status(401).json({
      message: "Invailid username or email",
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(401).json({
      message: "Invailid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
  httpOnly: true,      // JS se access nahi hoga (secure)
  secure: false,       // true only in production (HTTPS)
  sameSite: "lax",     // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

  return res.status(200).json({
    message: "user login successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token
    },
  });
}

//* User Logout feature for beginner

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "user logout successfully",
  });
}

module.exports = { registerUser, loginUser, logoutUser };
