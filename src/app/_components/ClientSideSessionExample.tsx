"use client"
import { useSession } from "next-auth/react";

function ClientSideSessionExample() {
  const { data: session } = useSession();

  function hey(event: any): void {
    console.log("hey")
  }

  return (
    <div>
      <h3>Client side session example here</h3>
        <div>{JSON.stringify(session)}</div> 
      <button onClick={hey}></button>
    </div>
  );
}

export default ClientSideSessionExample;
