export const generateEmailHtml = (user, order, meta) => {
    return `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333; text-align: center;">
        <h2 style="color: #6a1b9a;">✅ Confirmare rezervare CarRentalPro</h2>
        <p>Bună, <strong>${user.name}</strong>!</p>
        <p>Rezervarea ta a fost confirmată cu succes. Detalii:</p>
        <ul style="text-align: left; display: inline-block; margin-top: 10px;">
          <li><strong>Mașină:</strong> ${order.car.make} ${order.car.model}</li>
          <li><strong>Locație:</strong> ${meta.pickupLocation}</li>
          <li><strong>Preluare:</strong> ${new Date(meta.pickupDate).toLocaleString()}</li>
          <li><strong>Returnare:</strong> ${new Date(meta.returnDate).toLocaleString()}</li>
          <li><strong>Total:</strong> €${meta.remainingToPayAfterApplying}</li>
        </ul>
        <p style="margin-top: 20px;">Îți mulțumim că ai ales <strong>CarRentalPro</strong>!</p>
      </div>
    `;
  };
  