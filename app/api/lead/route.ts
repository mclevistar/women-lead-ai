import { NextResponse } from "next/server";

// Resource download sign ups are stored in our own Supabase table, separate from
// the Build by AI podcast list in Buttondown. The publishable key is safe to ship:
// the table only allows inserts with it, never reads.
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://klyubshxbbzzyppmrqnn.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_y3Apv7gdUlk85wS2DhpL_g_7gvtZgSG";

export async function POST(request: Request) {
  try {
    const { email, tag } = await request.json();

    if (!email || !tag) {
      return NextResponse.json({ error: "Email and resource are required" }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email: String(email).trim().toLowerCase(), resource: tag }),
    });

    if (!res.ok) {
      // log it but never block the download over a storage problem
      console.error("Supabase lead insert failed:", res.status, await res.text());
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
