import type { Metadata } from "next";
import "./globals.css";
import { appName } from "@/lib/constants";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import RootProvider from "@/components/providers/rootProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${appName} - Showcase Your Story`,
  description: `${appName} is a user-friendly portfolio building platform designed to help you showcase your talents and achievements effortlessly. Create, share, and manage your professional presence with existing templates and a seamless user experience.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
