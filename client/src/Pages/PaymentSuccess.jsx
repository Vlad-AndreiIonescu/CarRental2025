import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../Components/Navbar";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!sessionId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/stripe/order-details?session_id=${sessionId}`);
        const data = await res.json();
        setOrder(data.order);
      } catch (err) {
        navigate("/");
      }
    };
    fetchOrder();
  }, [sessionId, navigate]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "");
    doc.setFontSize(18);
    doc.text("Confirmare Plata - CARLUX", 105, 20, { align: "center" });

    const tableData = [
      ["Nume Client", order.customerName],
      ["ID Comanda", order._id],
      ["Locatie Ridicare", order.pickupLocation],
      ["Locatie Returnare", order.returnLocation],
      ["Data Preluare", new Date(order.pickupDate).toLocaleString()],
      ["Data Returnare", new Date(order.returnDate).toLocaleString()],
      ["Status", order.status],
      ["Masina", `${order.car.make} ${order.car.model}`],
      ["An fabricatie", order.car.year],
      ["Pret/zi", `€${order.car.pricePerDay}`],
    ];

    autoTable(doc, {
      startY: 30,
      head: [["Detaliu", "Valoare"]],
      body: tableData,
      styles: { halign: "left" },
       headStyles: { fillColor: [255, 153, 0], textColor: [255, 255, 255] }, // fundal galben, text alb
    });

    if (order.extras?.length > 0) {
      const extras = order.extras.map((e) => [e.name, `€${e.price}`]);
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Extra-optiuni", "Pret"]],
        body: extras,
        styles: { halign: "left" },
        headStyles: { fillColor: [255, 153, 0], textColor: [255, 255, 255] }, // fundal galben, text alb
      });
    }

    doc.setFontSize(14);
    doc.text(`Total Platit: €${order.totalPrice}`, 105, doc.lastAutoTable.finalY + 20, { align: "center" });
    doc.save("Factura_Confirmare_Plata.pdf");
  };

  if (!order) return <div className="text-center py-10">Se încarcă detaliile comenzii...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen px-4 py-10 flex justify-center">
        <div className="bg-white max-w-2xl w-full rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-6">✅ Plata reușită!</h2>

          <table className="w-full text-sm text-left mb-6">
            <tbody className="text-gray-700 divide-y">
              <tr><td className="font-semibold py-2 pr-4">Nume Client</td><td>{order.customerName}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">ID Comandă</td><td>{order._id}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">Locație Ridicare</td><td>{order.pickupLocation}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">Locație Returnare</td><td>{order.returnLocation}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">Data Preluare</td><td>{new Date(order.pickupDate).toLocaleString()}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">Data Returnare</td><td>{new Date(order.returnDate).toLocaleString()}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">Status</td><td>{order.status}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">Mașină</td><td>{order.car.make} {order.car.model}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">An fabricație</td><td>{order.car.year}</td></tr>
              <tr><td className="font-semibold py-2 pr-4">Preț/zi</td><td>€{order.car.pricePerDay}</td></tr>
            </tbody>
          </table>

          {order.extras?.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-1">Extra-opțiuni:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {order.extras.map((extra, i) => (
                  <li key={i}>{extra.name} – €{extra.price}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-lg font-bold text-center text-amber-500 mb-6">
            Total Plătit: €{order.totalPrice}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={generatePDF}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded"
            >
              Descarcă Factura PDF
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded"
            >
              Revenire Acasă
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
