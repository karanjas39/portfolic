"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

function Home() {
  const session = useSession();
  return (
    <div>
      <Button onClick={() => signIn()}>SignIn</Button>
      <Button onClick={() => signOut()}>SignOut</Button>
      {JSON.stringify(session.data?.user)}
    </div>
  );
}

export default Home;
