import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate a cryptographically secure random token for email verification
 * @returns {string} A secure random token
 */
export function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Send email verification email to user
 * @param {string} email - User's email address
 * @param {string} token - Verification token
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendVerificationEmail(email, token) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.NEXT_PUBLIC_APP_URL;
    const verificationUrl = `${baseUrl}/verify-email/${token}`;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify your email</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
              <h1 style="color: #333;">Verify your email address</h1>
              <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #666; font-size: 12px;">${verificationUrl}</p>
              <p style="color: #666; font-size: 12px; margin-top: 30px;">This link will expire in 24 hours.</p>
              <p style="color: #666; font-size: 12px;">If you didn't create an account, you can safely ignore this email.</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error: error.message };
  }
}
