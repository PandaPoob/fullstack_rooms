"use client";
import { useSession } from "next-auth/react";

function ClientSideSessionExample() {
  const { data: session } = useSession();

  return (
    <div>
      <h3>Client side session example here</h3>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}

export default ClientSideSessionExample;
