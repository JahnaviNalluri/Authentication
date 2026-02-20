const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const userSchema= mongoose.Schema({
    name  :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        required:true,
        match:[/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }

})
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


module.exports=mongoose.model("User",userSchema);