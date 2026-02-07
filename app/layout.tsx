import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { InteractiveCardProvider } from "@/components/ui/interactive-card-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

const departureMono = localFont({
  src: [
    {
      path: "./fonts/DepartureMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/DepartureMono-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-departure-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tanvesh.vercel.app"),
  title: "Tanvesh - Engineer and Designer",
  description:
    "I'm an engineer and designer. I build software with a strong focus on aesthetics and how things work.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Tanvesh - Engineer and Designer",
    description:
      "I'm an engineer and designer. I build software with a strong focus on aesthetics and how things work.",
    type: "website",
    siteName: "Tanvesh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvesh - Engineer and Designer",
    description:
      "I'm an engineer and designer. I build software with a strong focus on aesthetics and how things work.",
    creator: "@tanvesh01",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${departureMono.variable} ${ibmPlexSerif.variable} antialiased`}
      >
        <InteractiveCardProvider>{children}</InteractiveCardProvider>
        <Analytics />
      </body>
    </html>
  );
}
