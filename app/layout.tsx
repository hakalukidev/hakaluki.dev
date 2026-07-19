import type { Metadata } from "next";
import Script from "next/script";
import { Doto, Baloo_2, Anton, Silkscreen } from "next/font/google";
import "./globals.css";
import { services } from "./data/services";
import { founders } from "./data/founders";

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
const siteTitle = "hakaluki.dev | Web, App & AI Solutions";
const siteDescription =
  "hakaluki.dev is a Sylhet, Bangladesh-based software company building fast websites, mobile apps, AI automation, and machine learning solutions for founders and teams worldwide.";
const ogImage = {
  url: "/logo/hakaluki_logo.png",
  width: 692,
  height: 183,
  alt: "hakaluki.dev logo",
};
const orgLogo = {
  url: "/logo/title_logo.png",
  width: 512,
  height: 512,
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
    "hakaluki",
    "hakaluki software",
    "web development",
    "app development",
    "AI automation",
    "machine learning",
    "UI/UX design",
    "chatbot development",
    "custom software",
    "software company Sylhet",
    "software company Bangladesh",
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
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  legalName: "hakaluki.dev",
  alternateName: ["Hakaluki", "Hakaluki Dev", "Hakaluki Software"],
  slogan: "Automate. Innovate. Accelerate.",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}${orgLogo.url}`,
    width: orgLogo.width,
    height: orgLogo.height,
  },
  image: `${siteUrl}${ogImage.url}`,
  description: siteDescription,
  email: "contact@hakaluki.dev",
  telephone: "+8801844902338",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sylhet",
    addressCountry: "BD",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "contact@hakaluki.dev",
      telephone: "+8801844902338",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Bengali"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/hakaluki.dev",
    "https://www.instagram.com/hakaluki.dev/",
    "https://www.linkedin.com/company/131984355",
    "https://x.com/hakalukidev",
    "https://github.com/hakalukidev",
  ],
  areaServed: "Worldwide",
  knowsAbout: [
    "Web Development",
    "App Development",
    "Machine Learning",
    "AI Automation",
    "UI/UX Design",
    "Chatbot Development",
    "Custom Software",
    "Ecommerce Solutions",
  ],
  founder: founders.map((founder) => ({
    "@type": "Person",
    name: founder.name,
    jobTitle: founder.roleFull,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": `${siteUrl}/#organization` },
      },
    })),
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-US",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS51WL3X32"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BS51WL3X32');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
