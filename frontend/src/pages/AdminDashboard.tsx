import React, { useEffect, useState } from "react";
import api from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isDeleted: boolean;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Delete this user?")) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (err: any) {
        alert(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const handleToggleRole = async (user: User) => {
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    try {
      await api.put(`/admin/users/${user._id}`, { role: newRole });
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // Bonus: Toggle Soft Delete Status (Restore)
  const handleToggleActive = async (user: User) => {
    try {
      await api.put(`/admin/users/${user._id}`, { isDeleted: !user.isDeleted });
      fetchUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard - User Management
      </h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleToggleRole(user)}
                      className="text-blue-500 hover:underline"
                    >
                      {user.role}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className={`hover:underline ${
                        user.isDeleted ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {user.isDeleted ? "Deleted" : "Active"}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
