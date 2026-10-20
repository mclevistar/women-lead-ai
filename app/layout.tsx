import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Bebas_Neue, Manrope, Caveat, DM_Sans, DM_Serif_Display } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BootcampPopup from "@/components/bootcamp-popup";
import JsonLd from "@/components/json-ld";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, organizationSchema, personSchema } from "@/lib/seo";
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

const dmSerif = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--loaded-dmserif",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--loaded-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Women Lead AI",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image" },
};

const siteSchema = {
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": organizationSchema["@id"] },
    },
    organizationSchema,
    personSchema,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${bebasNeue.variable} ${manrope.variable} ${caveat.variable} ${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={siteSchema} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <BootcampPopup />
        <Analytics />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "z0nx51ghld");`}
        </Script>
      </body>
    </html>
  );
}
