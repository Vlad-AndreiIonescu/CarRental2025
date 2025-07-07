export default function Users() {
  const users = [
    {
      name: "Ion Popescu",
      email: "ion.popescu@email.com",
      registered: "2025-01-10",
      role: "client",
    },
    {
      name: "Admin CarLux",
      email: "admin@carlux.com",
      registered: "2025-01-01",
      role: "admin",
    },
    {
      name: "Ana Radu",
      email: "ana.radu@email.com",
      registered: "2025-02-14",
      role: "client",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👤 Utilizatori</h1>
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
          {users.map((u, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.registered}</td>
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
    </div>
  );
}
