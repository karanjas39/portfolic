"use client";

import { signIn, signOut } from "next-auth/react";

function Navbar() {
  return (
    <div>
      <button onClick={() => signIn()}>Signin</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default Navbar;
