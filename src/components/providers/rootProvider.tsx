"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/themeProvider";
import { SessionProvider } from "next-auth/react";

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
          {children}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

export default RootProvider;
