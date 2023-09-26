"use client";

import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-btn-gradient p-2 rounded-2xl mt-3"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
