import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

async function Home() {
const session = await getServerSession(authOptions)
  return (
    <main>
      <h1>Home page</h1>
    </main>
  );
}
export default Home;
