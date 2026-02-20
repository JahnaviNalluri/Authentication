const User = require("../models/User");
const bcrypt=require("bcryptjs");
const userService=require("../services/userService");
const createUser=async(req,res)=>{
    try{
        const user=await userService.createUser(req.body);
        res.status(201).json(user);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};
const deleteUser=async(req,res)=>{
    try{
        const user=await userService.deleteUser(req.params.id);
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};
const updateUser=async(req,res)=>{
    try{
        const user=await userService.updateUser(req.params.id,req.body);
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    }
};
const getAllUsers=async(req,res)=>{
    try{
        const user=await userService.getAllUsers();
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    };
};
const getUserById=async(req,res)=>{
    try{
        const user= await userService.getUserById(req.params.id);
        res.status(201).json(user);
    }catch(err){
        res.status(400).json({message:err.message});
    };
};
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const loginUser=async(req,res)=>{
    try{
        const {email,password} =req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not found"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalidd Passwordd"});
        const token=generateToken(user);
        res.json({
            name: user.name,
            email:user.email,
            role:user.role,
            _id:user._id,
            token,
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};
module.exports={
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById
};