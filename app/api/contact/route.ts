import { NextResponse } from "next/server";

// Every site form (contact, speaking, partnerships, bootcamp) posts here. Enquiries are stored
// in our own Supabase table so none are ever lost. The publishable key is safe to ship: the
// table only allows inserts with it, never reads.
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://klyubshxbbzzyppmrqnn.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_y3Apv7gdUlk85wS2DhpL_g_7gvtZgSG";

// Email notifications go out from here through Resend when RESEND_API_KEY is set. Its shared
// onboarding@resend.dev sender needs no DNS, but it only delivers to the address the Resend account
// was made with (wiktoria@womenlead.ai). Without the key, the browser falls back to FormSubmit.
const RESEND_TO = "wiktoria@womenlead.ai";
async function sendNotification(subject: string, fields: Record<string, string>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 12px;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM ?? "Women Lead AI forms <onboarding@resend.dev>",
        to: [process.env.NOTIFY_TO ?? RESEND_TO],
        reply_to: fields.Email,
        subject,
        html: `<table style="font-family:Helvetica,Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
        text: Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join("\n\n"),
      }),
    });
    if (!res.ok) console.error("Resend notification failed:", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("Resend notification failed:", e);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, type, reason, organisation, eventType, eventDate } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = {
      type: ["speaking", "bootcamp", "bootcamp-intake"].includes(type) ? type : "contact",
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      organisation: organisation || null,
      event_type: eventType || null,
      event_date: eventDate || null,
      reason: reason || null,
      message: String(message),
    };

    const saved = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(enquiry),
    });

    if (!saved.ok) {
      console.error("Supabase enquiry insert failed:", saved.status, await saved.text());
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    const from = `${enquiry.name}${organisation ? ` (${organisation})` : ""}`;
    const subject = enquiry.type === "speaking"
      ? `Speaking Request from ${from}`
      : enquiry.type === "bootcamp"
        ? `Bootcamp question (${reason || "no day"}) from ${enquiry.name}`
        : enquiry.type === "bootcamp-intake"
        ? `Bootcamp intake form from ${enquiry.name}`
        : type === "partnership"
        ? `Brand Partnership from ${from}`
        : `Contact Form: ${enquiry.name}`;

    const fields: Record<string, string> = {
      Name: enquiry.name,
      Email: enquiry.email,
      ...(organisation && { Organisation: organisation }),
      ...(eventType && { "Event type": eventType }),
      ...(eventDate && { "Event date": eventDate }),
      ...(reason && { [enquiry.type === "bootcamp" ? "Day" : enquiry.type === "bootcamp-intake" ? "Paid Claude plan" : "Reason"]: reason }),
      Message: enquiry.message,
    };

    // Sent from the server when Resend is set up. Otherwise the visitor's browser sends it through
    // FormSubmit (lib/notify-enquiry.ts), which blocks requests from hosting servers.
    if (await sendNotification(subject, fields)) return NextResponse.json({ success: true });
    return NextResponse.json({ success: true, notification: { subject, fields } });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
