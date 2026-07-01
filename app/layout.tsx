import type { Metadata } from "next";
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
      <body style={themeStyle}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
