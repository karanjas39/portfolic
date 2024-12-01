import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  if (!session?.user?.id) {
    redirect("/signin");
  }

  redirect(`/p/dashboard/${session.user.id}`);
}
