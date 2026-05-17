import type { Metadata } from "next";
import { Bebas_Neue, Manrope, Caveat, DM_Sans } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--loaded-bebas",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--loaded-manrope",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--loaded-caveat",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--loaded-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Women Lead AI",
    template: "%s | Women Lead AI",
  },
  description: "A podcast and platform exploring AI, leadership and the future of tech. Hosted from a female founder's perspective.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
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
    <html lang="en" className={`h-full antialiased ${bebasNeue.variable} ${manrope.variable} ${caveat.variable} ${dmSans.variable}`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
