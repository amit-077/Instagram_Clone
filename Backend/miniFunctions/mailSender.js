const nodemailer = require("nodemailer");
const { verificatonToken } = require("./verificationToken");

const transporter = nodemailer.createTransport({
  sendMail: true,
  service: "gmail",
  auth: {
    user: "ben10realfan@gmail.com",
    pass: "ytsvkjlogcnnvahf",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendVerificationMail(name, email) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Photogram_Verify" <photogram@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Photogram Account Verification", // Subject line
      text: "", // plain text body
      html: `<html><body><p>Dear <strong>${name}</strong>,<br>

      Thank you for creating an account with Photogram! We are thrilled to have you on board as a part of our growing community.<br>
      
      Before we get started, we need to verify your email address to ensure the security and authenticity of your account.<br>
      
      The below is the OTP for your email verification, please do not share this with anyone.<br><br>
      
      <h2>${await verificatonToken()}</h2><br>
      
      
      Please note that this verification code is valid for the next 24 hours. After this period, you may need to request a new verification email.<br>
      
      If you did not create an account on Photogram or believe you received this email in error, please disregard this message.</p></body></html>`, // html body
    });

    console.log(info);
  } catch (e) {
    console.log(e);
  }
}

async function forgotPasswordMail(name, email) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Photogram_Forgot_password" <photogram@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Your Photogram Password", // Subject line
      text: "", // plain text body
      html: `<html><body><p>Dear <strong>${name}</strong>,<br>

      We recently received a request to reset your password for your Photogram account.
      To ensure the security of your account, we are sending you a One-Time Password (OTP) to verify your identity and facilitate the password reset process.<br>
      
      Please find your OTP below: <br><br>
      
      <h2>${await verificatonToken()}</h2><br>
      
      
      Please enter this OTP on the password reset page to proceed with the reset process.<br>
      This OTP will expire after 10 minutes for security purposes, so please act promptly.<br>

      If you did not initiate this password reset request, you can disregard this email. Rest assured that your account is safe and secure.<br>
      </p></body></html>`, // html body
    });

    console.log(info);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { sendVerificationMail, forgotPasswordMail };
