const User=require("../models/User");
const mongoose=require("mongoose");
const createUser=async({name,email,password})=>{
    const exist=await User.findOne({email});
    if(exist){
        throw new Error("User already exists");
    }
    return await User.create({name,email,password});
};
const deleteUser=async(userId)=>{
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("invalid user ID");
    }
    const exist=await User.findByIdAndDelete(userId);
    if(!exist){
        throw new Error("User not exist");
    }
    return exist;
};
const updateUser=async(userId,data)=>{
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("userID doesnt exist");
    }
    const exist=await User.findByIdAndUpdate(userId,data,{new:true});
     if(!exist){
        throw new Error("User not exist");
    }
    return exist;
};
const getAllUsers=async()=>{
    return await User.find().select("-password");
};
const getUserById=async(userId)=>{
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("userID not exist");
    }
    const exist=User.findById(userId).select("-password");
     if(!exist){
        throw new Error("User not exist");
    }
    return exist;
};
const loginUser=async({email,password})=>{
    const user=await User.findOne({email});
    if(!user) throw new Error("user doesnt exist");
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) throw new Error("Invalid Password");
    return {_id:user._id,name:user.name,email:user.email,role:user.role};
}
module.exports={
    createUser,deleteUser,updateUser,getAllUsers,getUserById,loginUser
};