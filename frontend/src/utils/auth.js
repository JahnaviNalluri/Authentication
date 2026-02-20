import { useNavigate } from "react-router-dom";
export const logout = (navigate) => {
  localStorage.removeItem("userInfo"); 
  navigate("/"); // redirect to login
};