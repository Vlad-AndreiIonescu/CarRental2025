import { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "client"
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/api/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(res.data);
      } catch (error) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const updateUserRole = async (userId, newRole) => {
    if (!window.confirm(`Change this user's role to ${newRole}?`)) return;
    
    try {
      await axios.patch(
        `/api/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      setError("Failed to update user role");
      console.error("Error updating user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/users/${editingUserId}`,
        editForm,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setUsers(users.map(user => 
        user._id === editingUserId ? res.data : user
      ));
      setEditingUserId(null);
    } catch (error) {
      setError("Failed to update user");
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-blue-100 text-blue-700";
      case "manager":
        return "bg-purple-100 text-purple-700";
      case "employee":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">👤 Utilizatori</h1>
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">👤 Utilizatori</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Caută utilizatori
          </label>
          <input
            type="text"
            id="search"
            placeholder="Caută după nume sau email..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrează după rol
          </label>
          <select
            id="role"
            className="w-full p-2 border rounded"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Toți utilizatorii</option>
            <option value="admin">Administratori</option>
            <option value="manager">Manageri</option>
            <option value="employee">Angajați</option>
            <option value="client">Clienți</option>
          </select>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editare utilizator</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nume</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={editForm.role}
                    onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                  >
                    <option value="admin">Administrator</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Angajat</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingUserId(null)}
                  className="px-4 py-2 border rounded"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Salvează
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-3 px-4">Nume</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Înregistrat</th>
              <th className="py-3 px-4">Rol</th>
              <th className="py-3 px-4">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  Nu s-au găsit utilizatori
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      className={`text-xs font-medium p-1 rounded ${getRoleColor(user.role)}`}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Angajat</option>
                      <option value="client">Client</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}