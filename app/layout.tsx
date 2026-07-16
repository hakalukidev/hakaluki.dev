import type { Metadata } from "next";
import { Doto, Baloo_2, Anton, Silkscreen } from "next/font/google";
import "./globals.css";

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://hakaluki.dev";
const siteName = "hakaluki.dev";
const siteTitle = "hakaluki.dev — Web, App & AI Solutions";
const siteDescription =
  "hakaluki.dev is a creative studio building fast websites, mobile apps, AI automation, and machine learning solutions for founders and teams.";
const ogImage = {
  url: "/logo/hakaluki_logo.png",
  width: 692,
  height: 183,
  alt: "hakaluki.dev logo",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "hakaluki.dev",
    "web development",
    "app development",
    "AI automation",
    "machine learning",
    "UI/UX design",
    "chatbot development",
    "custom software",
    "Sylhet Bangladesh software agency",
  ],
  authors: [{ name: "hakaluki.dev", url: siteUrl }],
  creator: "hakaluki.dev",
  publisher: "hakaluki.dev",
  category: "technology",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}${ogImage.url}`,
  description: siteDescription,
  email: "contact@hakaluki.dev",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sylhet",
    addressCountry: "BD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Browser extensions can inject html/body attributes before hydration. */}
      <body
        suppressHydrationWarning
        className={`${doto.variable} ${baloo2.variable} ${anton.variable} ${silkscreen.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
