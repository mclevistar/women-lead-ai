import { NextResponse } from "next/server";

// Contact and speaking enquiries are stored in our own Supabase table so none are
// ever lost. The publishable key is safe to ship: the table only allows inserts
// with it, never reads.
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://klyubshxbbzzyppmrqnn.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_y3Apv7gdUlk85wS2DhpL_g_7gvtZgSG";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, type, reason, organisation, eventType, eventDate } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enquiry = {
      type: type === "speaking" ? "speaking" : "contact",
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
      : type === "partnership"
        ? `Brand Partnership from ${from}`
        : `Contact Form: ${enquiry.name}`;

    // The email itself is sent from the visitor's browser (lib/notify-enquiry.ts): FormSubmit blocks
    // requests from hosting servers, so a server-side send silently never arrives.
    return NextResponse.json({
      success: true,
      notification: {
        subject,
        fields: {
          Name: enquiry.name,
          Email: enquiry.email,
          ...(organisation && { Organisation: organisation }),
          ...(eventType && { "Event type": eventType }),
          ...(eventDate && { "Event date": eventDate }),
          ...(reason && { Reason: reason }),
          Message: enquiry.message,
        },
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
