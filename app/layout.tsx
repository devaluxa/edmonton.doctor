import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "../styles/brand.css";
import Footer from "../components/global/Footer";
import Header from "../components/global/Header";
import {
  brandAssets,
  businessName,
  siteDescription,
  themeStyle,
} from "../lib/business/config";
import { siteUrl } from "../lib/sitePages";

const googleTagManagerId = "GTM-NBJH3GNB";
const googleAnalyticsId = "G-H0EWZ53PXR";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: businessName,
  description: siteDescription,
  openGraph: {
    title: businessName,
    description: siteDescription,
    siteName: businessName,
    type: "website",
    url: siteUrl,
  },
  icons: {
    icon: [
      {
        url: brandAssets.favicon,
        type: "image/svg+xml",
      },
    ],
    shortcut: brandAssets.favicon,
    apple: brandAssets.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${googleTagManagerId}');
        `}
      </Script>
      <Script
        id="google-analytics-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
      <body style={themeStyle}>
        <noscript>
          <iframe
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            width="0"
          />
        </noscript>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
