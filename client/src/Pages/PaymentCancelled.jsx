import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">CarLux</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Home
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Plata eșuată</h2>
          <p className="text-gray-700 mb-6">
            Din păcate, plata nu a fost finalizată. Poți încerca din nou sau alege o altă metodă de plată.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Înapoi la Acasă
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentCancelled;
