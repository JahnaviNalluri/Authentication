import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import {useNavigate} from "react-router-dom";
import "../css/Login.css";
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
    <div className="login-container">
        <h2>{isLogin?"Login":"Register"}</h2>
        <form onSubmit={handleSubmit}>
            {error && <p className="login-error">{error}</p>}
        {!isLogin&&(
            <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="FullName"
            className="login-input"
            />
             )}
        <input 
        name="email" 
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="login-input"
        />
        <input 
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        className="login-input"
       /> 

        <button type="submit" className="login-button" >{isLogin?"Login":"Register"}</button>

    </form>



    <p className="toggle-text">
        {isLogin?"Dont have an account?" :"Already have an account?"} {" "}
        <button onClick={()=>setIsLogin(!isLogin)} 
       className="toggle-button">
       {isLogin?"Register":"Login"}
        </button>
    </p>
    </div>
    
)

}
export default Login;