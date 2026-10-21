// Email notification for form enquiries via FormSubmit (no account or API key needed).
// Called from the browser after /api/contact has saved the enquiry: FormSubmit blocks requests
// from hosting servers. It also holds every email until its one-time "Activate Form" link,
// sent to this address, has been clicked (done for wiktoria@oxfordtalks.io on 21 Oct 2026).
export const NOTIFY_EMAIL = "wiktoria@oxfordtalks.io";

type Notification = { subject: string; fields: Record<string, string> };

// Never throws: the enquiry is already saved, so the form should still show success
export async function notifyEnquiry(res: Response) {
  try {
    const { notification } = (await res.json()) as { notification?: Notification };
    if (!notification) return;
    await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: notification.subject,
        _replyto: notification.fields.Email,
        _template: "table",
        _captcha: "false",
        ...notification.fields,
      }),
    });
  } catch {
    // ignore: the enquiry is in Supabase either way
  }
}
