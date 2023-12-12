import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ProfileLink from "./ProfileLink";
import NotificationLink from "./NotificationLink";

async function MainNavigation() {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user && (
        <>
          <Link href="/" className="md:hidden py-9 px-7">
            Logo here
          </Link>

          <div className="h-full w-full md:auto md:h-screen bg-bg_black">
            <nav className="fixed bottom-0 left-0 w-screen md:relative md:w-auto md:h-full z-20 bg-bg_black">
              <ul className="flex w-full justify-evenly items-center md:justify-start pb-3 pt-2 md:pt-7 md:w-auto md:flex-col md:items-start md:gap-6 md:px-9 md:h-full">
                <li>
                  <Link
                    href="/rooms"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.9237 12.9463H18.6929C18.0557 12.9463 17.5391 13.4629 17.5391 14.1001V27.9463C17.5391 28.5835 18.0557 29.1001 18.6929 29.1001H27.9237C28.5609 29.1001 29.0775 28.5835 29.0775 27.9463V14.1001C29.0775 13.4629 28.5609 12.9463 27.9237 12.9463Z"
                        fill="#9A9A9A"
                        stroke="#9A9A9A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.9237 1H18.6929C18.0557 1 17.5391 1.51659 17.5391 2.15385V6.79231C17.5391 7.42956 18.0557 7.94615 18.6929 7.94615H27.9237C28.5609 7.94615 29.0775 7.42956 29.0775 6.79231V2.15385C29.0775 1.51659 28.5609 1 27.9237 1Z"
                        fill="#9A9A9A"
                        stroke="#9A9A9A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.3846 1H2.15385C1.51659 1 1 1.51659 1 2.15385V16C1 16.6372 1.51659 17.1538 2.15385 17.1538H11.3846C12.0219 17.1538 12.5385 16.6372 12.5385 16V2.15385C12.5385 1.51659 12.0219 1 11.3846 1Z"
                        fill="#9A9A9A"
                        stroke="#9A9A9A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.3846 22.1543H2.15385C1.51659 22.1543 1 22.6709 1 23.3081V27.9466C1 28.5839 1.51659 29.1005 2.15385 29.1005H11.3846C12.0219 29.1005 12.5385 28.5839 12.5385 27.9466V23.3081C12.5385 22.6709 12.0219 22.1543 11.3846 22.1543Z"
                        fill="#9A9A9A"
                        stroke="#9A9A9A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
                <NotificationLink />
                <li>
                  <Link
                    href="/calendar"
                    className="flex p-3 rounded-full border border-primary px-[0.88rem]"
                  >
                    <svg
                      width="26"
                      height="30"
                      viewBox="0 0 26 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.62437 30C1.87687 30 1.25287 29.7466 0.752375 29.2397C0.250791 28.7318 0 28.0993 0 27.3423V6.32748C0 5.57049 0.250791 4.93856 0.752375 4.43171C1.25287 3.92375 1.87687 3.66978 2.62437 3.66978H5.50063V0H7.25075V3.66978H18.8744V0H20.4994V3.66978H23.3756C24.1231 3.66978 24.7471 3.92375 25.2476 4.43171C25.7492 4.93856 26 5.57049 26 6.32748V27.3423C26 28.0993 25.7498 28.7312 25.2493 29.2381C24.7477 29.746 24.1231 30 23.3756 30H2.62437ZM2.62437 28.3544H23.3756C23.6248 28.3544 23.8539 28.249 24.063 28.0384C24.271 27.8267 24.375 27.5946 24.375 27.3423V12.91H1.625V27.3423C1.625 27.5946 1.729 27.8267 1.937 28.0384C2.14608 28.249 2.37521 28.3544 2.62437 28.3544ZM1.625 11.2644H24.375V6.32748C24.375 6.07515 24.271 5.84312 24.063 5.63138C23.8539 5.42073 23.6248 5.31541 23.3756 5.31541H2.62437C2.37521 5.31541 2.14608 5.42073 1.937 5.63138C1.729 5.84312 1.625 6.07515 1.625 6.32748V11.2644Z"
                        fill="#9A9A9A"
                      />
                    </svg>
                  </Link>
                </li>
                <ProfileLink />
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default MainNavigation;
