import { useState, useEffect } from "react";
import { getAllUsers, getUserProfile, deleteUser } from "../services/userService";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../css/AdminPage.css"; // ✅ import css

function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleViewProfile = async (id) => {
    try {
      const data = await getUserProfile(id);
      alert(
        `User Profile:\n\nName: ${data.name}\nEmail: ${data.email}\nRole: ${data.role}`
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch user profile");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard - Users</h2>
        <button
          onClick={() => logout(navigate)}
          className="logout-button"
        >
          Logout
        </button>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => handleViewProfile(user._id)}
                      className="view-button"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;