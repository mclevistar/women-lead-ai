import type { Metadata } from "next";
import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import LegalPage, { LegalSection, COMPANY } from "@/components/legal-page";
import CookieSettingsLink from "@/components/cookie-settings-link";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "What personal data Women Lead AI collects, why, who it is shared with, and how to get it changed or deleted.",
  path: "/privacy",
});

const email = <a href={`mailto:${EXTERNAL_LINKS.email}`}>{EXTERNAL_LINKS.email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          This page explains what we collect when you use womenlead.ai, why we collect it and what you can do about it. The short version: we only ask for what we need, we never sell your data, and you can ask us to delete it at any time.
        </p>
      }
    >
      <LegalSection title="Who we are">
        <p>
          Women Lead AI is run by <strong>{COMPANY.name}</strong>, a company registered in England and Wales (company number {COMPANY.number}), with its registered office at {COMPANY.address}. We are the &ldquo;controller&rdquo; of the personal data described here, which means we decide how it is used.
        </p>
        <p>If you have any questions about your data, email us at {email}.</p>
      </LegalSection>

      <LegalSection title="What we collect">
        <ul>
          <li><strong>Your email address</strong> when you download a free resource, join the newsletter or join a course waitlist.</li>
          <li><strong>What you tell us in a form</strong> on the contact, speaking or partnerships pages: your name, email, organisation, event details and your message.</li>
          <li><strong>Where you came from</strong> (for example, the Instagram post or YouTube video that sent you), if the link you clicked had campaign tags. We save this next to your email when you download a resource, so we know which content is helpful.</li>
          <li><strong>Purchase details</strong> when you buy a course: your name, email and what you bought. Payments are handled by Stripe. We never see or store your card details.</li>
          <li><strong>How you use the site</strong>, such as the pages you visit, the device and browser you use, and clicks and scrolls. See &ldquo;Cookies and analytics&rdquo; below.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Why we use it">
        <ul>
          <li><strong>To send you what you asked for</strong>, such as a resource, the newsletter or course access. Our legal basis is your consent, or the contract with you when you buy a course.</li>
          <li><strong>To reply to your enquiry</strong> and talk about speaking, workshops or partnerships. Our legal basis is our legitimate interest in answering people who contact us.</li>
          <li><strong>To understand what is working</strong> and improve the site and our content. For analytics cookies, our legal basis is your consent. For anonymous visit counts, it is our legitimate interest.</li>
          <li><strong>To keep records</strong> we are required to keep by law, such as payment records for tax.</li>
        </ul>
        <p>We do not sell your data, we do not use it for advertising and we do not make automated decisions about you.</p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>We use a small number of trusted services to run the site. They only process your data to provide their service to us:</p>
        <ul>
          <li><strong>Vercel</strong> hosts the website and counts visits anonymously (no cookies).</li>
          <li><strong>Supabase</strong> stores resource sign ups and form enquiries.</li>
          <li><strong>Buttondown</strong> sends the newsletter and course waitlist emails.</li>
          <li><strong>FormSubmit</strong> forwards form enquiries to our inbox.</li>
          <li><strong>Stripe</strong> processes course payments.</li>
          <li><strong>Google Analytics</strong> and <strong>Microsoft Clarity</strong> show us how the site is used, only with cookies if you accept them.</li>
          <li><strong>YouTube</strong> plays the videos embedded on our pages. When you play one, YouTube may set its own cookies.</li>
        </ul>
        <p>
          If you join our community on Skool, or follow a link to another site, that site&apos;s own privacy policy applies. We may also share data if the law requires it.
        </p>
      </LegalSection>

      <LegalSection title="Data outside the UK">
        <p>
          Some of these services store data in the United States or the European Union. Where that happens, we rely on the protections UK law requires, such as the UK&apos;s adequacy rules or standard contract clauses approved by the Information Commissioner&apos;s Office.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and analytics">
        <p>
          When you first visit, we ask whether you are happy with analytics cookies. If you decline, Google Analytics and Microsoft Clarity run without cookies and cannot recognise you on your next visit. You can change your choice at any time: <CookieSettingsLink />.
        </p>
        <p>We also save a few small things in your browser so the site works properly:</p>
        <ul>
          <li>your cookie choice, so we don&apos;t ask you again</li>
          <li>whether you closed the course pop up, so it doesn&apos;t keep coming back</li>
          <li>campaign tags from the link you arrived on, for that visit only</li>
        </ul>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <ul>
          <li>Newsletter and waitlist emails: until you unsubscribe (every email has an unsubscribe link).</li>
          <li>Resource sign ups and enquiries: for as long as they are useful to us, and we delete them as soon as you ask.</li>
          <li>Purchase records: six years, because UK tax law requires it.</li>
          <li>Analytics data: up to 14 months in Google Analytics and up to 13 months in Microsoft Clarity.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Under UK data protection law you can ask us to:</p>
        <ul>
          <li>give you a copy of the data we hold about you</li>
          <li>correct anything that is wrong</li>
          <li>delete your data</li>
          <li>stop or limit how we use it, including withdrawing your consent at any time</li>
          <li>send your data to you or another organisation in a usable format</li>
        </ul>
        <p>
          Just email {email} and we will reply within one month. It&apos;s free. If you are not happy with how we handle your data, you can complain to the Information Commissioner&apos;s Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">ico.org.uk</a>, but we&apos;d love the chance to sort it out first.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>Our site, courses and community are for adults. We don&apos;t knowingly collect data from anyone under 18.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If we change how we use your data, we&apos;ll update this page and the date at the top. For bigger changes, we&apos;ll let subscribers know by email. See also our <Link href="/terms">Terms of Use</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
