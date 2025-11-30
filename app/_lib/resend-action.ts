"use server";

import { Resend } from "resend";
import { render } from "@react-email/components";
import EmailTemplate from "../components/contact/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string | undefined;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const emailHtml = await render(
      EmailTemplate({ name, email, phone, subject, message })
    );

    const { data, error } = await resend.emails.send({
      from: "Elara Store <onboarding@resend.dev>",
      to: "shahdraafat.725@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: emailHtml,
      replyTo: email as string,
    });
    if (data) {
      return { success: true };
    }

    return { success: false, error: error?.message || "Failed to send email" };
  } catch (error) {
    console.error("Send email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
