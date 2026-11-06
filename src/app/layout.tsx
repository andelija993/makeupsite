import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const body = Manrope({ variable: "--font-body", subsets: ["latin", "latin-ext"] });
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});
const script = Allura({ variable: "--font-script", subsets: ["latin", "latin-ext"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "sr_RS",
    siteName: site.name,
    images: [{ url: "/logo.png", width: 1000, height: 1000, alt: site.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#120e0c",
};

// Tamna tema je podrazumevana; svetla se koristi samo ako je posetilac izabere.
const themeScript = `(function(){try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")!=="light")}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sr-Latn"
      suppressHydrationWarning
      className={`dark ${body.variable} ${display.variable} ${script.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
