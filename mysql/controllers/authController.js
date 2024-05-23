const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require('fs');
const User = require("../models/user");
const sequelize = require('../database');
const dotenv = require("dotenv");

dotenv.config();

/**
 * @desc    Register new User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 */
const register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    return res.status(400).json({ message: "This user is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  let Data, ContentType;

  if (req.file) {
    try {
      Data = await fs.promises.readFile(req.file.path);
      ContentType = req.file.mimetype;
      req.file = req.file.path; 
    } catch (err) {
      console.error(err);
      return res.status(500).send('Error reading image file');
    }
  } else {
    Data = await fs.promises.readFile("./images/Avatar.png");
    ContentType = "";
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    profilePicture: Data,
    profilePictureContentType: ContentType,
    friends: req.body.friends,
    dateOfBirth: req.body.dateOfBirth,
    bioContent: req.body.bioContent,
    location: req.body.location,
    occupation: req.body.occupation,
  });

  res.status(200).json(user);
});

/**
 * @desc    Login new User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 */
const login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ _id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token, { expire: new Date(Date.now() + 8000000) });

  const { password, ...other } = user.get({ plain: true });
  return res.json({
    token: token,
    user: { ...other },
  });
});

module.exports = {
  register,
  login,
};
