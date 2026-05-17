import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, type, reason, company, service } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error("BUTTONDOWN_API_KEY not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const tag = type === "b2b" ? "b2b-enquiry" : "contact-enquiry";

    const notes = [
      `Name: ${name}`,
      company ? `Company: ${company}` : null,
      service ? `Service: ${service}` : null,
      reason ? `Reason: ${reason}` : null,
      `\nMessage:\n${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        tags: [tag],
        notes,
      }),
    });

    // 409 = already subscribed, still counts as received
    if (!res.ok && res.status !== 409) {
      const error = await res.text();
      console.error("Buttondown error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
