import { UTM_KEYS, type Utm } from "@/lib/utm";

// Resource download sign ups are stored in our own Supabase table, separate from
// the Build by AI podcast list in Buttondown. The publishable key is safe to ship:
// the table only allows inserts with it, never reads.
const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://klyubshxbbzzyppmrqnn.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_y3Apv7gdUlk85wS2DhpL_g_7gvtZgSG";

function insert(row: Record<string, string>) {
  return fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });
}

export async function saveLead(email: string, resource: string, utm: Utm = {}) {
  const row: Record<string, string> = { email: String(email).trim().toLowerCase(), resource };
  for (const key of UTM_KEYS) {
    const value = utm?.[key];
    if (typeof value === "string" && value.trim()) row[key] = value.trim().slice(0, 200);
  }

  let res = await insert(row);
  // the UTM columns are missing (PGRST204): save the lead without them rather than lose it
  if (res.status === 400 && (await res.clone().json().catch(() => null))?.code === "PGRST204") {
    console.error("leads table is missing UTM columns, saving without them");
    res = await insert({ email: row.email, resource });
  }

  if (!res.ok) {
    // log it but never block the download over a storage problem
    console.error("Supabase lead insert failed:", res.status, await res.text());
  }
}
