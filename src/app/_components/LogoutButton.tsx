"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-6 py-3 w-full font-medium transition hover:bg-opacity-10 hover:bg-warning rounded-b-xl "
    >
      Logout
    </button>
  );
}

export default LogoutButton;
