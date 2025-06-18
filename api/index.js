import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("Error connecting MongoDB", error);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running");
});

app.use("/api/user", userRoutes);
 