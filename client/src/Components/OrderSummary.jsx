const OrderSummary = ({ booking, selectedExtras, totalPrice, placeOrder }) => {
  return (
    <div className="shadow-md rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Rental Summary</h2>
      <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
      <p><strong>Pickup Date:</strong> {new Date(booking.pickupDate).toLocaleString()}</p>
      <p><strong>Return Date:</strong> {new Date(booking.returnDate).toLocaleString()}</p>
      <p><strong>Rental Days:</strong> {booking.rentalDays} days</p>

      <p className="mt-4"><strong>Extras:</strong></p>
      {selectedExtras.length === 0 ? (
        <p className="text-gray-500">No extras selected</p>
      ) : (
        <ul className="list-disc pl-5">
          {selectedExtras.map((extra, index) => (
            <li key={index}>{extra.name} - €{extra.price}</li>
          ))}
        </ul>
      )}

      <hr className="my-4" />
      <p className="text-xl font-semibold">Total: €{totalPrice.toFixed(2)}</p>

      <button
        onClick={placeOrder}
        className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Continuă către plată
      </button>

    </div>
  );
};

export default OrderSummary;
