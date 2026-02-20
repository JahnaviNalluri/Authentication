import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import {useNavigate} from "react-router-dom";
function Login(){
    const navigate=useNavigate();
    const [isLogin,setIsLogin]=useState(true);
    const [error,setError]=useState("");
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    }
    //testingpurpose  ki testx where x=1,2,34,5 ,,11 endhuku
    const handleSubmit=async(e)=>{
        e.preventDefault();
    try{
        if(isLogin){
             const data=await loginUser(formData);
             if (!data?.email) {
            setError("Invalid Email or password");
            return;
             }
            if(data.role==="admin"){
                navigate("/admin");
            }else{
                navigate("/dashboard");
            }
        }else{
            const data=await registerUser(formData);
            console.log("Registered: ",data);
            setIsLogin(true);
            setFormData({name:"",email:"",password:""});
        }
       
    }catch(error){
        console.error(error.response?.data?.message||"Something went wrong");
    }
};

return(
    <div style={{maxWidth:400,margin:"auto",padding:20}}>
        <h2>{isLogin?"Login":"Register"}</h2>
        <form onSubmit={handleSubmit}>
            {error && <p style={{color:"red",marginBottom:10}}>{error}</p>}
        {!isLogin&&(
            <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="FullName"
            style={{display:"block",marginBottom:10,width:"100%"}}/>

             )}
        <input 
        name="email" 
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        style={{ display: "block", marginBottom: 10, width: "100%" }}/>

        <input 
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        style={{ display: "block", marginBottom: 10, width: "100%" }}/>
        

        <button type="submit" style={{width:"100%"}}>{isLogin?"Login":"Register"}</button>

    </form>



    <p style={{marginTop:10,textAlign:"center"}}>
        {isLogin?"Dont have an account?" :"Already have an account?"} {" "}
        <button onClick={()=>setIsLogin(!isLogin)} 
        style={{border:"none",background:"none",color:"blue",cursor:"pointer"}}>
            {isLogin?"Register":"Login"}
        </button>
    </p>
    </div>
    
)

}
export default Login;