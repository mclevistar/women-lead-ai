import type { Metadata } from "next";
import Link from "next/link";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import LegalPage, { LegalSection, COMPANY } from "@/components/legal-page";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms for using womenlead.ai, our free resources and our paid courses, including our refund policy.",
  path: "/terms",
});

const email = <a href={`mailto:${EXTERNAL_LINKS.email}`}>{EXTERNAL_LINKS.email}</a>;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro={
        <p>
          These terms cover your use of womenlead.ai, our free resources and our paid courses. By using the site or buying a course, you agree to them. We&apos;ve kept them as short and plain as we can.
        </p>
      }
    >
      <LegalSection title="Who we are">
        <p>
          Women Lead AI is run by <strong>{COMPANY.name}</strong>, a company registered in England and Wales (company number {COMPANY.number}), with its registered office at {COMPANY.address}. In these terms, &ldquo;we&rdquo; and &ldquo;us&rdquo; means {COMPANY.name}. You can reach us at {email}.
        </p>
      </LegalSection>

      <LegalSection title="Using the site">
        <p>You&apos;re welcome to use the site to learn, watch, listen and download our resources. Please don&apos;t:</p>
        <ul>
          <li>use it for anything unlawful</li>
          <li>try to break, overload or get unauthorised access to the site or the systems behind it</li>
          <li>sign up with someone else&apos;s email address</li>
          <li>scrape or copy the site in bulk</li>
        </ul>
      </LegalSection>

      <LegalSection title="Our content">
        <p>
          The videos, podcast episodes, prompts, guides, templates and course materials on this site belong to us (or to the people we&apos;ve licensed them from). You can use them for your own work and your own business. Please don&apos;t resell them, share course materials or logins with people who haven&apos;t paid, or publish them as your own.
        </p>
        <p>Sharing a link to our free resources is always welcome.</p>
      </LegalSection>

      <LegalSection title="Paid courses">
        <ul>
          <li>The price, start date and what&apos;s included are shown on the course page and at checkout. Payments are handled securely by Stripe.</li>
          <li>Your access is for you only. Please don&apos;t share it.</li>
          <li>We may update course content to keep it current. AI tools change fast, so a tool, feature or price we show may change after we record a lesson.</li>
          <li>If we have to cancel or move a course, we&apos;ll tell you as soon as we can and offer you a full refund if the new date doesn&apos;t work for you.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Refunds">
        <p>
          We want every course to be worth it. If you don&apos;t get value from a course, email {email} <strong>within 7 days of the course ending</strong>{" "}and we&apos;ll give you a full refund. Once you&apos;re refunded, your access to the course and its content ends.
        </p>
        <p>This doesn&apos;t affect your legal rights as a consumer under UK law, for example if the content is faulty or not as described.</p>
      </LegalSection>

      <LegalSection title="Other tools and sites">
        <p>
          We talk about and link to lots of tools and sites we don&apos;t run, such as Claude, YouTube, Skool and Stripe. Their own terms and prices apply, and we aren&apos;t responsible for them. Some links are affiliate or referral links, which means we may earn a small commission at no extra cost to you. We only recommend tools we actually use or rate.
        </p>
      </LegalSection>

      <LegalSection title="No guarantees">
        <p>
          Everything we share is education, based on our own experience. It isn&apos;t legal, financial or professional advice, and we can&apos;t promise any particular result, such as more followers, sales or a new job. AI tools can make mistakes, so always check what they produce before you rely on it.
        </p>
      </LegalSection>

      <LegalSection title="Our liability">
        <p>
          We work hard to keep the site running and accurate, but we can&apos;t promise it will always be available or error free. We aren&apos;t responsible for any loss that wasn&apos;t foreseeable, or for business losses such as lost profit or lost opportunities. If something we&apos;re responsible for goes wrong with a paid course, our total liability to you is limited to the price you paid for it.
        </p>
        <p>
          Nothing in these terms limits our liability where the law doesn&apos;t allow it, including for death or personal injury caused by our negligence, or for fraud.
        </p>
      </LegalSection>

      <LegalSection title="Your data">
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> explains what personal data we collect and how we use it.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          We may update these terms from time to time. We&apos;ll change the date at the top when we do. The terms that applied when you bought a course still apply to that course.
        </p>
      </LegalSection>

      <LegalSection title="Law">
        <p>
          These terms are governed by the law of England and Wales, and the courts of England and Wales can hear any dispute. If you live in Scotland or Northern Ireland, you can also bring a claim in your local courts.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
