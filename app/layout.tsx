/**
 * Root Layout
 * Provides global styling, fonts, and wraps with client-side features.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Aldrich } from "next/font/google";
import "./globals.css";
import StarNavigation from "@/components/star-navigation/StarNavigation";
import { ClientLayout } from "@/components/ClientLayout";
import { baseMetadata } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const aldrich = Aldrich({
  variable: "--font-aldrich",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aldrich.variable} antialiased`}
        style={{ minHeight: "100vh", background: "#000" }}
      >
        <ClientLayout>
          <StarNavigation />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
