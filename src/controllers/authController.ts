import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "user not found!",
      });

    const { resetToken } = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const base = process.env.RESET_PASSWORD_BASE_URL || "http://localhost:3000";
    const resetURL = `${base}/reset-password/${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Your password reset token (valid for 1 hour)",
        text: `Reset your password using this link: ${resetURL}`,
      });
      res
        .status(200)
        .json({ success: true, message: "Token sent to email", resetURL });
    } catch (emailErr) {
      user.passwordResetToken = undefined as any;
      user.passwordResetExpires = undefined as any;
      await user.save({ validateBeforeSave: false });
      return next(emailErr);
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.params.token;
    const { password } = req.body;

    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Token is required" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select("+password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Token is invalid or expired" });

    // Update password and clear reset fields
    user.password = password;
    user.passwordResetToken = undefined as any;
    user.passwordResetExpires = undefined as any;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. Please login.",
    });
  } catch (error) {
    next(error);
  }
};
