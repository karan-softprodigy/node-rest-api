const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  // steps in signup:-
  //1. check if user exist
  //2. Hash password
  //3. Create new user
  //4. Generate token

  const { email, username, password } = req.body;

  try {
    const isUserExist = await userModel.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser?.email, id: newUser._id },
      process.env.SECRET_KEY
    );
    res
      .status(201)
      .json({ message: "User created", user: newUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await userModel.findOne({ email: email });
    if (!isUserExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, isUserExist.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: isUserExist.email, id: isUserExist._id },
      process.env.SECRET_KEY
    );
    res.status(200).json({ user: isUserExist, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signin, signup };
