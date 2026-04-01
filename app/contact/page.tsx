import { EXTERNAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";
import GeneralContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Women Lead AI. We'd love to hear from you.",
};

const socialLinks = [
  { label: "LinkedIn", href: EXTERNAL_LINKS.linkedin },
  { label: "Instagram", href: EXTERNAL_LINKS.instagram },
  { label: "TikTok", href: EXTERNAL_LINKS.tiktok },
  { label: "YouTube", href: EXTERNAL_LINKS.youtube },
];

export default function ContactPage() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
          Contact
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-3">
          We&apos;d love to hear from you. Whether it&apos;s a podcast guest suggestion, a business enquiry, or just a hello.
        </p>
        <p className="text-center mb-10">
          <a href={`mailto:${EXTERNAL_LINKS.email}`} className="text-primary font-medium hover:underline">
            {EXTERNAL_LINKS.email}
          </a>
        </p>

        <GeneralContactForm />

        <div className="mt-12 flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
