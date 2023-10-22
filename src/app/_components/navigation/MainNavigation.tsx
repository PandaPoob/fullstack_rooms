import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "../LogoutButton";
import homeIcon from "../../../../public/home.svg";
import roomsIcon from "../../../../public/rooms.svg";
import notificationIcon from "../../../../public/notification.svg";
import settingsIcon from "../../../../public/settings.svg";

import Image from "next/image";

async function MainNavigation() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session?.user ? (
        <>
          <a href="/" className="md:hidden py-9 px-7">
            Logo here
          </a>
          <div className="h-full w-full md:auto md:h-auto">
            <nav className="fixed bottom-0 left-0 w-screen md:relative md:w-auto">
              <ul className="flex w-full justify-evenly items-center pb-3 pt-2 md:pt-7 md:w-auto md:flex-col md:items-start md:gap-6 md:px-9">
                <li>
                  <a
                    href="/"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Image src={homeIcon} alt="home" width={30} />
                  </a>
                </li>
                <li>
                  <a
                    href="/rooms"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Image src={roomsIcon} alt="home" width={28} />
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Image src={notificationIcon} alt="home" width={28} />
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <Image src={settingsIcon} alt="home" width={28} />
                  </a>
                </li>
                {/*               <li>
                  <LogoutButton />
                </li> */}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <div>Logo here</div>
      )}
    </>
  );
}

export default MainNavigation;
