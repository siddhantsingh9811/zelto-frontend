const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

// Temporary storage for OTPs
const otps = {};

// Route to send OTP to email
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email ID is required.');
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const expiration = Date.now() + 600000; // Set expiration time to 10 minutes (600,000 milliseconds)
  
  otps[email] = { otp, expiration };

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Reset Password OTP',
    text: `Your OTP to reset password is: ${otp}. It will expire in 10 minutes.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send OTP.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('OTP sent to your email.');
    }
  });
});

// Route to verify OTP and reset password
app.post('/reset-password', (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;
  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).send('All fields are required.');
  }

  if (!otps[email]) {
    return res.status(400).send('OTP has expired. Please request a new OTP.');
  }

  const { otp: storedOtp, expiration } = otps[email];

  if (otp !== storedOtp) {
    return res.status(400).send('Invalid OTP. Please try again.');
  }

  if (Date.now() > expiration) {
    delete otps[email];
    return res.status(400).send('OTP has expired. Please request a new OTP.');
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).send('Passwords do not match. Please try again.');
  }

  // Update password logic goes here (e.g., update database)
  // For demonstration purposes, we'll just log the new password
  console.log(`Password reset successfully for ${email}. New password: ${newPassword}`);

  // Clear OTP from storage
  delete otps[email];

  res.status(200).send('Password reset successfully.');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
