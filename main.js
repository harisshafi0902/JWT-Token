import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import { forgotPassword, resetPassword } from "./forgotPassword/index.js";

const app = express();

// ^ Express Middlewares
app.use(json());
app.use(express.urlencoded({ extended: true }));

// ^ Routes
app.post("/forgotPassword", forgotPassword);
app.patch("/resetPassword/:token", resetPassword);

// app.all("*", (req, res, next) => {
//   res.status(500).json({
//     status: "failed",
//     message: "Cant find route on server",
//   });
// });

// ^ Server Listening
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
