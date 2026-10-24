import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vishwajeet Rawat",
  description: "Software developer, fullstack developer currently working at DDPI groups.",
  icons: {
    icon: [
      { url: "/vr-logo-white-transparent.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/vr-logo-white-transparent.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full m-0 p-0 bg-[#05070a] text-[#dfe7e0] overflow-hidden">
        {children}
      </body>
    </html>
  );
}
