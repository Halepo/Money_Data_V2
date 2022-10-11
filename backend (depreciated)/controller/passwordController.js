'use strict';
require("dotenv").config();
const express = require("express");
const User = require("../model/user");
const Token = require("../model/token");
const nodeMailer = require('../config/nodemailer');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const formateForMail = require('../config/formatformail');

const app = express();

app.use(express.json());

const forgotPassword = async (req, res, next) => {
  const email = req.body.email;

  const user = await User.findOne({ email });

  // check if user already exists
  if (!user) throw new Error("User does not exist");

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 10);

  // Create password reset token
  await new Token({
    user_id: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `/resetpassword?token=${resetToken}&id=${user._id}`;  // add client URL ${process.env.DOMAIN}
  const msg = formateForMail.formateForMail('forgotPassword', link);

  nodeMailer.nodeMailer(user.email, 'Money Data Password Assistance', msg);  // change recipient to user.email
  return res.json({
    success: true,
    msg: 'Mail is sent to the registered mail address'
  });
}

const resetPassword = async (req, res, next) => {
  // Get input
  const { token, id } = req.query;
  const { password, passwordConfirmation } = req.body;

  // Check if password reset token exists
  let passwordResetToken = await Token.findOne({ id });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  // Validate password reset token
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    await passwordResetToken.deleteOne();
    throw new Error("Invalid or expired password reset token");
  }

  // Encrypt password
  const hash = await bcrypt.hash(password, 10);

  await User.updateOne(
    { _id: id },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: id });

  const msg = formateForMail.formateForMail('resetPassword', '');
  nodeMailer.nodeMailer(user.email, 'Asketari New Password', msg);

  await passwordResetToken.deleteOne();

  return res.json({
    success: true,
    msg: 'Password Reset Successfully'
  });
}

const changePassowrd = async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  let email = req.user.email;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(oldPassword, user.password))) {

    //Encrypt password
    const hash = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { email: email },
      { $set: { password: hash } },
      { new: true }
    );
    return res.status(400).json({ message: "Password change successful" });
  }
  else {
    return res.status(400).json({ message: "Wrong password" });
  }
}

module.exports = { forgotPassword, resetPassword, changePassowrd };
