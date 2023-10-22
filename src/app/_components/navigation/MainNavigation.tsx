import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Home from "../../assets/svgs/home.svg";
import Rooms from "../../assets/svgs/rooms.svg";
import Notifications from "../../assets/svgs/notification.svg";
import Settings from "../../assets/svgs/settings.svg";
import Link from "next/link";

async function MainNavigation() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user && (
        <>
          <Link href="/" className="md:hidden py-9 px-7">
            Logo here
          </Link>

          <div className="h-full w-full md:auto md:h-auto">
            <nav className="fixed bottom-0 left-0 w-screen md:relative md:w-auto">
              <ul className="flex w-full justify-evenly items-center pb-3 pt-2 md:pt-7 md:w-auto md:flex-col md:items-start md:gap-6 md:px-9">
                <li>
                  <Link
                    href="/"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Home />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rooms"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Rooms />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Notifications />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Settings />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default MainNavigation;
