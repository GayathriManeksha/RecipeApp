import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router =express.Router();


// DISPLAY ALL
router.get("/",async (req,res)=>{
    try {
        const response= await RecipeModel.find({});
        res.json(response);
    } catch (error) {

        res.json(error);
    }
});

// CREATE RECIPES
router.post("/", verifyToken ,async (req,res)=>{
    console.log("Creating Recipes------------")
    // console.log(req)
    const recipe=new RecipeModel(req.body);
    try {
        const response= await recipe.save();
        console.log("Response here")
        console.log(response)
        res.json(response);
    } catch (error) {

        console.error("Error found")
        res.json(error);
    }
});


// SAVE RECIPES
router.put("/",verifyToken,async (req,res)=>{

    const recipe=await RecipeModel.findById(req.body.recipeID);
    const user=await UserModel.findById(req.body.userID);
    try {
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes:user.savedRecipes});
    } catch (error) {
        res.json(error);
    }
});

//DISPLAY SAVED

router.get("/savedRecipes/ids/:userID",async (req,res)=>{
    try {
        const user=await UserModel.findById(req.params.userID);
        res.json({savedRecipes:user?.savedRecipes})
        
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedRecipes/:userID",async (req,res)=>{
    try {
        const user=await UserModel.findById(req.params.userID);
        const savedRecipes=await RecipeModel.find({
            _id:{$in:user.savedRecipes},
        });
        res.json({savedRecipes})
        
    } catch (error) {
        res.json(error);
    }
});



export {router as recipesRouter}; 


