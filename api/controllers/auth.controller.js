import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    next(errorHandler(400,"All fields are required." ))
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        next(errorHandler(409,"User with this email already exists." ))
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
            next(errorHandler(409,"Username is already taken." ))
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    next(error)
  }
};
