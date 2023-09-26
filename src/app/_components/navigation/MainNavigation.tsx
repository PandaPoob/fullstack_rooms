import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "../LogoutButton";

async function MainNavigation() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user ? (
        <header className="bg-primary">
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/rooms">Rooms</a>
              </li>
              <li>
                <a href="/">Notifications</a>
              </li>
              <li>
                <a href="/">Settings</a>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        <div>Logo here</div>
      )}
    </>
  );
}

export default MainNavigation;
