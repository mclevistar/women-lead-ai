import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    const { email, tag, utm } = await request.json();

    if (!email || !tag) {
      return NextResponse.json({ error: "Email and resource are required" }, { status: 400 });
    }

    await saveLead(email, tag, utm);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
