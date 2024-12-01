import { cn } from "@/lib/utils";
import { Archivo_Black } from "next/font/google";
import ModeToggle from "@/components/theme/modeToggle";
import { appName } from "@/lib/constants";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Archivo_Black_Font = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

function Navbar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  const isSignInPage = pathName === "/signin";
  const isProtectedPath = pathName.includes("/p");

  if (status === "loading") {
    return (
      <div className="flex w-full items-center justify-between px-3 py-2">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between px-3 py-2">
      {/* Logo */}
      <Link
        href="/"
        className={cn(
          Archivo_Black_Font.className,
          "font-bold text-2xl text-primary"
        )}
      >
        {appName}.
      </Link>

      <div className="flex items-center gap-2">
        <ModeToggle />
        {session ? (
          isProtectedPath ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : (
            <Link href={`/p/dashboard/${session.user?.id}`}>
              <Button>Dashboard</Button>
            </Link>
          )
        ) : isSignInPage ? (
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
