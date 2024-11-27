import { cn } from "@/lib/utils";
import { Archivo_Black } from "next/font/google";
import ModeToggle from "@/components/theme/modeToggle";
import { appName } from "@/lib/constants";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Archivo_Black_Font = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex w-full items-center justify-between px-3 py-2">
      <div>
        <Link
          className={cn(
            Archivo_Black_Font.className,
            "font-bold text-2xl text-primary"
          )}
          href="/"
        >
          {appName}.
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {!session ? (
          <Button onClick={() => signIn()}>Sign in</Button>
        ) : (
          <Button onClick={() => signOut()}>Sign out</Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
