import API from "../api/axios";

export const getUserProfile=async(id)=>{
    const {data}=await API.get(`/${id}`);
    return data;
};

export const updateUser=async(id,formData)=>{
    const {data}=await API.put(`/${id}`,formData);
    return data;
};

export const deleteUser=async(id)=>{
    const {data}=await API.delete(`/${id}`);
    return data;
};
export const getAllUsers=async()=>{
    const {data}=await API.get("/");
    return data;
}