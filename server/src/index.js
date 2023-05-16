// Old  notation to use import add type to module in package.json
// const express= require("express");
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

//since import is used add .js extension as well
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);

// if pushing in github need to use environment variables .before ? put the name of the specific database that we're connecting to.Here recipes
mongoose.connect(process.env.MONGO_URL);

app.listen(3001,()=>console.log("SERVER STARTED"));