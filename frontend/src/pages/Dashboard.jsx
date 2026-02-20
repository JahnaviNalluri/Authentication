import { useEffect, useState } from "react";
import { getUserProfile, updateUser } from "../services/userService";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const data = await getUserProfile(userInfo._id);
      setUser(data);
      setFormData({ name: data.name, email: data.email });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const data = await updateUser(userInfo._id, formData);
      setUser(data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>User Dashboard</h2>
       <button
        onClick={() => logout(navigate)}
        style={{
          float: "right",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          padding: "8px 16px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Logout
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {user && (
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: 10 }}>
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>Email:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>

          <button type="submit" style={{ width: "100%" }}>
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}

export default Dashboard;