import { useEffect, useState } from "react";
import { getUserProfile, updateUser } from "../services/userService";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css"; // ✅ import css

function Dashboard() {
  const navigate = useNavigate();
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>User Dashboard</h2>
        <button
          onClick={() => logout(navigate)}
          className="logout-button"
        >
          Logout
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}

      {user && (
        <form onSubmit={handleUpdate}>
          <div className="dashboard-form-group">
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="dashboard-input"
            />
          </div>

          <div className="dashboard-form-group">
            <label>Email:</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="dashboard-input"
            />
          </div>

          <button type="submit" className="update-button">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
}

export default Dashboard;