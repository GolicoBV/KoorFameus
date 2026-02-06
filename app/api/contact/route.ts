import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: "Alle velden zijn verplicht" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Ongeldig e-mailadres" },
        { status: 400 }
      );
    }

    // Send email using Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "info@koorfameus.be";

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Koor Fameus Website <noreply@koorfameus.be>",
          to: [recipientEmail],
          reply_to: data.email,
          subject: `[Website Contact] ${data.subject}`,
          html: `
            <h2>Nieuw bericht via de website</h2>
            <p><strong>Van:</strong> ${data.name} (${data.email})</p>
            <p><strong>Onderwerp:</strong> ${data.subject}</p>
            <hr />
            <p><strong>Bericht:</strong></p>
            <p>${data.message.replace(/\n/g, "<br />")}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">
              Dit bericht werd verstuurd via het contactformulier op koorfameus.be
            </p>
          `,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send email via Resend:", await response.text());
        throw new Error("Failed to send email");
      }
    } else {
      // Log to console if no email service is configured
      console.log("Contact form submission (no email service configured):");
      console.log("Name:", data.name);
      console.log("Email:", data.email);
      console.log("Subject:", data.subject);
      console.log("Message:", data.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het versturen" },
      { status: 500 }
    );
  }
}
