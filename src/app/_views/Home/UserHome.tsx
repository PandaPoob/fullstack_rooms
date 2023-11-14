import LogoutButton from "@/app/_components/LogoutButton";
import { Session } from "next-auth";

function UserHome({ session }: { session: Session }) {
  return (
    <main>
      <h1 className="text-h2">Home page</h1>
      <h2>
        Welcome home {`${session.user.first_name} ${session.user.last_name}`}
      </h2>
      
      <LogoutButton />
    </main>
  );
}

export default UserHome;
