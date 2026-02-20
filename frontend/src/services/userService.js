import API from "../api/axios";

export const getUserProfile=async(id)=>{
    const {data}=await API.get(`/api/user/${id}`);
    return data;
};

export const updateUser=async(id,formData)=>{
    const {data}=await API.put(`/api/user/${id}`,formData);
    return data;
};

export const deleteUser=async(id)=>{
    const {data}=await API.delete(`/api/user/${id}`);
    return data;
};
export const getAllUsers=async()=>{
    const {data}=await API.get("/api/user");
    return data;
}
