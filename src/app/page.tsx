import Navbar from "@/components/navbar/navbar";
import ModeToggle from "@/components/theme/modeToggle";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div>
      <Navbar />
      {JSON.stringify(session)}
      <ModeToggle />
    </div>
  );
}
