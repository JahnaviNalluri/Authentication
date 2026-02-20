// backend/src/app.js
const express=require("express");
const cors=require("cors");
const userRouter=require("../src/routes/userRouter.js");
// import express from "express";
// import cors from "cors";
// import userRouter from "./routes/userRouter.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRouter);

// Root route (test)
app.get("/", (req, res) => {
  res.send("user API is running");
});

module.exports=app;
