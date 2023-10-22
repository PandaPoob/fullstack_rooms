import { requireAuthentication } from "@/app/_middleware/authentication";
import { authOptions } from "@/lib/auth";
import UserHome from "./UserHome";
import DefaultHome from "./DefaultHome";
import { getServerSession } from "next-auth";

async function Home() {
  const session = await getServerSession(authOptions);

  return session ? <UserHome session={session} /> : <DefaultHome />;
}
export default Home;
