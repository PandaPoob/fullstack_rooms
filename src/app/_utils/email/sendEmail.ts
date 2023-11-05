import { EmailData } from "@/app/_models/email";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function sendEmail(emailData: EmailData) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "freja400d@gmail.com",
      pass: "qksidrofwqyfmooi",
    },
  });

  try {
    const mailOptions = {
      from: "freja400d@gmail.com",
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
