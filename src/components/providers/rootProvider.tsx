"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";

function RootProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen w-full flex flex-col">
            <Navbar />
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default RootProvider;
