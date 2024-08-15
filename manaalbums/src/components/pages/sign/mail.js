// Example using Express.js
import express from "express";
import nodemailer from "nodemailer";
const app = express();
app.use(express.json());

// Mock user store
let users = [];


// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

// Endpoint to send confirmation email
app.post("/sendConfirmationEmail", (req, res) => {
  const { to, activationCode } = req.body;

  const mailOptions = {
    from: "your-email@gmail.com",
    to,
    subject: "Confirm Your Registration",
    text: `Please click the following link to activate your account: http://localhost:9999/activate?code=${activationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Confirmation email sent");
  });
});

app.get("/activate", (req, res) => {
  const { code } = req.query;
  const user = users.find((u) => u.activationCode === code);

  if (user) {
    user.isActive = true;
    res.status(200).send("Account activated successfully");
  } else {
    res.status(400).send("Invalid activation code");
  }
});
