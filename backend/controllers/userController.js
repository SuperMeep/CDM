const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const asyncHandler = require("express-async-handler");

const signupUser = asyncHandler(async (req, res) => {
  // Validate and extract user data from the request body
  const { name, studentNumber, password, role } = req.body;

  if (!studentNumber || !password) {
    res.status(409);
    throw new Error("Please add all fields");
  }
  if (!validator.isStudentNumber(studentNumber)) {
    throw new Error("Student Number not valid");
  }
  const existingUser = await User.findOne({ studentNumber });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Set the hashed password
  // Create a new user instance
  const user = await User.create({
    name,
    studentNumber,
    password: hashedPassword,
    role,
  });

  const userId = user._id;
  const tokenPayload = { userId, role };

  if (user) {
    res.status(201).json({
      message: "User registered successfully",
      name,
      studentNumber,
      token: generateToken(tokenPayload),
      role: user.role,
      userId,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // Validate and extract user credentials
  const { studentNumber, password, ...rest } = req.body;

  // Check if any additional properties are present in the request body
  if (Object.keys(rest).length > 0) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  if (!studentNumber || !password) {
    res.status(409);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ studentNumber });
  if (!user) {
    res.status(409);
    throw new Error("Incorrect studentNumber");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(403);
    throw new Error("Incorrect password");
  }

  const userId = user._id;
  const role = user.role;
  const name = user.name;
  const tokenPayload = { userId, role };

  if (user) {
    res.status(200).json({
      name,
      studentNumber,
      userId,
      role,
      token: generateToken(tokenPayload),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const currentUser = async (req, res) => {
  res.json({ message: "current user bitch" });
};

const generateToken = (tokenPayload) => {
  return jwt.sign(tokenPayload, process.env.SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  signupUser,
  loginUser,
  currentUser,
};
