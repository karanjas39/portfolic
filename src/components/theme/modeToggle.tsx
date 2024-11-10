"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {resolvedTheme === "light" ? (
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <SunIcon className="absolute h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
