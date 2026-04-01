import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Women Lead AI",
    template: "%s | Women Lead AI",
  },
  description: "A podcast and platform exploring AI, leadership and the future of tech. Hosted from a female founder's perspective.",
  openGraph: {
    title: "Women Lead AI",
    description: "A podcast and platform exploring AI, leadership and the future of tech.",
    url: "https://womenlead.ai",
    siteName: "Women Lead AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-body">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
