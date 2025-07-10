import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://carrental2025.onrender.com/api/auth", {
        withCredentials: true,
      });
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Eroare la obținerea utilizatorilor:", err);
      setError("Nu s-au putut încărca utilizatorii.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👤 Utilizatori</h1>

      {loading ? (
        <p className="text-gray-500">Se încarcă utilizatorii...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">Nu există utilizatori.</p>
      ) : (
        <table className="w-full text-sm bg-white rounded shadow">
          <thead>
            <tr className="text-left border-b bg-gray-100">
              <th className="py-2 px-3">Nume</th>
              <th>Email</th>
              <th>Înregistrat la</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.role === "admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
