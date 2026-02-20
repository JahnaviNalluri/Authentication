import { useState, useEffect } from "react";
import { getAllUsers, getUserProfile, deleteUser } from "../services/userService";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
function AdminPage() {
    const navigate=useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users
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

  // Delete user by id
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

  // View user profile by id
  const handleViewProfile = async (id) => {
    try {
      const data = await getUserProfile(id);
      alert(`User Profile:\n\nName: ${data.name}\nEmail: ${data.email}\nRole: ${data.role}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch user profile");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard - Users</h2>
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

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: 20 }}>
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
                    <button onClick={() => handleViewProfile(user._id)}>View</button>{" "}
                    <button
                      onClick={() => handleDelete(user._id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;