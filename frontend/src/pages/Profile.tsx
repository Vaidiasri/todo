import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await api.put("/users/profile", {
        name,
        email,
        password: password || undefined,
      });
      // Update auth context
      const token = localStorage.getItem("token");
      if (token) {
        login(token, res.data);
      }
      setMessage("Profile updated successfully");
      setPassword(""); // Clear password field
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await api.delete("/users/profile");
        logout();
        navigate("/login");
      } catch (err: any) {
        setError(err.response?.data?.message || "Delete failed");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      {message && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
      )}

      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">
            New Password (leave blank to keep current)
          </label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h3>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
