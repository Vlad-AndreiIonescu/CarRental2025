export const generateEmailHtml = (user, order, meta) => {
    return `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333; text-align: center;">
        <h2 style="color: #6a1b9a;">✅ Confirmare rezervare CarLux</h2>
        <p>Bună, <strong>${user.name}</strong>!</p>
        <p>Rezervarea ta a fost confirmată cu succes. Detalii:</p>
        <ul style="text-align: left; display: inline-block; margin-top: 10px;">
          <li><strong>Mașină:</strong> ${order.car.make}</li>
          <li><strong>Locație Preluare:</strong> ${meta.pickupLocation}</li>
          <li><strong>Locatie Returnare:</strong> ${meta.returnLocation}</li>
          <li><strong>Preluare:</strong> ${new Date(meta.pickupDate).toLocaleString()}</li>
          <li><strong>Returnare:</strong> ${new Date(meta.returnDate).toLocaleString()}</li>
          <li><strong>Total:</strong> €${meta.remainingToPayAfterApplying}</li>
        </ul>
        <p style="margin-top: 20px;">Îți mulțumim că ai ales <strong>CarLux</strong>!</p>
      </div>
    `;
  };

export const generateWelcomeEmail = (user, code) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
      <h2 style="color: #f39c12;">🚗 Bun venit la CarLux, ${user.name}!</h2>
      <p>Contul tău a fost creat cu succes.</p>
      <p>Din partea noastră, primești un <strong>cod de reducere</strong> pe care îl poți folosi la prima rezervare:</p>
      <h3 style="background: #eee; padding: 10px; display: inline-block;">${code}</h3>
      <p>Acest cod îți oferă o reducere de <strong>€15</strong> și este valabil 7 zile.</p>
      <hr/>
      <p>Îți dorim drumuri sigure și experiențe memorabile alături de CarLux!</p>
    </div>
  `;
};

  