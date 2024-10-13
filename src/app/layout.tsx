import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { web_app_name } from "@/lib/constants";
import { Poppins as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${web_app_name} - Showcase Your Story`,
  description: `${web_app_name} is a user-friendly portfolio building platform designed to help you showcase your talents and achievements effortlessly. Create, share, and manage your professional presence with existing templates and a seamless user experience.`,
  keywords: "portfolio builder, portfolic",
  authors: [
    { name: "Jaskaran Singh", url: "https://developerjaskaran.netlify.app/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <Navbar />
        <div className="pt-12">{children}</div>
      </body>
    </html>
  );
}
