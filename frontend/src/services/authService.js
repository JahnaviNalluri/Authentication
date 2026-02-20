import API from "../api/axios";

export const loginUser=async(formData)=>{
    const {data} =await API.post("/login",formData);
    localStorage.setItem("userInfo",JSON.stringify(data));
    return data;
};
export const  registerUser=async(formData)=>{
    const {data} =await API.post("/",formData);
    return data;
};
