import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

export const generateInvoicePdfBuffer = async (order, user) => {
  const doc = new PDFDocument({ margin: 50 });
  const stream = new PassThrough();
  doc.pipe(stream);

  // Header
  doc.font("Helvetica-Bold")
    .fontSize(20)
    .text("Factura CarLux", { align: "center" })
    .moveDown(1.5);

  // Client & Booking Info
  doc.font("Helvetica").fontSize(12);
  doc.text(`Nume client: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.moveDown();
  doc.text(`Locatie ridicare: ${order.pickupLocation}`);
  doc.text(`Data preluare: ${new Date(order.pickupDate).toLocaleString()}`);
  doc.text(`Data returnare: ${new Date(order.returnDate).toLocaleString()}`);
  doc.moveDown();

  // Car Info
  doc.text(`Masina: ${order.car.make} ${order.car.model}`);
  if (order.car.year) doc.text(`An fabricatie: ${order.car.year}`);
  if (order.car.pricePerDay) doc.text(`Pret/zi: €${order.car.pricePerDay}`);
  doc.moveDown();

  // Extras
  if (order.extras?.length) {
    doc.text("Optiuni suplimentare:");
    order.extras.forEach(extra => {
      doc.text(`   - ${extra.name} – €${extra.price}`);
    });
    doc.moveDown();
  }

  // Total
  doc.font("Helvetica-Bold").fontSize(14);
  doc.text(`Total platit: €${order.totalPrice}`, { align: "right" });

  doc.end();

  // Return as buffer
  return await new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
};
