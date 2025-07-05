import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "carrentalvladd@gmail.com",
    pass: "uaqh qlsr joop qucw",
  },
});

const sendEmail = async (to, subject, html, attachments = []) => {
  await transporter.sendMail({
    from: "CarLux <carrentalvladd@gmail.com>",
    to,
    subject,
    html,
    attachments,
  });
};

export default sendEmail;
