import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Home() {
  //server session
  const session = await getServerSession(authOptions);

  console.log(session);
  return (
    <main>
      <h1 className="text-h2">Home page</h1>
      {session && (
        <h2>
          Welcome home {`${session.user.first_name} ${session.user.last_name}`}
        </h2>
      )}
    </main>
  );
}
export default Home;
