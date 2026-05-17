import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, type, reason, company, service } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const subject = type === "b2b"
      ? `B2B Enquiry from ${name}${company ? ` (${company})` : ""}`
      : `Contact Form: ${name}`;

    const lines = [
      `<strong>Name:</strong> ${name}`,
      `<strong>Email:</strong> ${email}`,
      company ? `<strong>Company:</strong> ${company}` : null,
      service ? `<strong>Service:</strong> ${service}` : null,
      reason ? `<strong>Reason:</strong> ${reason}` : null,
      `<br/><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}`,
    ].filter(Boolean).join("<br/>");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Women Lead AI <onboarding@resend.dev>",
        to: ["hello@womenlead.ai"],
        reply_to: email,
        subject,
        html: `<p>${lines}</p>`,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
