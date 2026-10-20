import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, tag } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error("BUTTONDOWN_API_KEY not configured");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${apiKey}`,
        // existing subscribers get the new tag merged in instead of a 400
        "X-Buttondown-Collision-Behavior": "add",
      },
      body: JSON.stringify({
        email_address: email,
        tags: tag ? [tag] : [],
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      // 400 covers people Buttondown won't update (unsubscribed, blocked, bounced);
      // still let them through so a resource download is never blocked
      if (res.status === 400) {
        console.warn("Buttondown rejected subscriber:", error);
        return NextResponse.json({ success: true });
      }
      console.error("Buttondown error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
