const nodemailer = require("nodemailer");

const sendOTP = async (email, otp, fullName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Smart Parking OTP Verification",
    html: `<h2>Hello, ${fullName}!</h2>
           <p>Your OTP is: ${otp}</p>
           <p>Valid for 5 minutes</p>`,
  };

  await transporter.sendMail(mailOptions);

  console.log("OTP Email Sent");
};

module.exports = sendOTP;
