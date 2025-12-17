import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Application Tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
