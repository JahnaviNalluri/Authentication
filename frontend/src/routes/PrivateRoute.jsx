import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (role && userInfo.role !== role) {
    // Role mismatch
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;