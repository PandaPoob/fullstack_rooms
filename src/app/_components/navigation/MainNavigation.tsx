import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
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
                    <svg
                      width="32"
                      height="28"
                      viewBox="0 0 32 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8 28V18.1176H19.2V28H27.2V14.8235H32L16 0L0 14.8235H4.8V28H12.8Z"
                        fill="#9A9A9A"
                      />
                    </svg>
                  </Link>
                </li>
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
                <li>
                  <Link
                    href="/"
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <svg
                      width="24"
                      height="28"
                      viewBox="0 0 24 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.8571 22.1455H22V11.3273C22 6.83773 18.275 3.12773 13.4286 2.51045V1.27273C13.4286 0.569545 12.7893 0 12 0C11.2107 0 10.5714 0.569545 10.5714 1.27273V2.51045C5.725 3.12773 2 6.83773 2 11.3273V22.1455H1.14286C0.510714 22.1455 0 22.6005 0 23.1636V24.1818C0 24.3218 0.128571 24.4364 0.285714 24.4364H8C8 26.4027 9.79286 28 12 28C14.2071 28 16 26.4027 16 24.4364H23.7143C23.8714 24.4364 24 24.3218 24 24.1818V23.1636C24 22.6005 23.4893 22.1455 22.8571 22.1455ZM12 25.9636C11.0536 25.9636 10.2857 25.2795 10.2857 24.4364H13.7143C13.7143 25.2795 12.9464 25.9636 12 25.9636ZM4.57143 22.1455V11.3273C4.57143 9.55818 5.34286 7.89727 6.74643 6.64682C8.15 5.39636 10.0143 4.70909 12 4.70909C13.9857 4.70909 15.85 5.39636 17.2536 6.64682C18.6571 7.89727 19.4286 9.55818 19.4286 11.3273V22.1455H4.57143Z"
                        fill="#9A9A9A"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/profile/${session?.user.id}`}
                    className="flex p-3 rounded-full border border-primary"
                  >
                    <svg
                      width="27"
                      height="28"
                      viewBox="0 0 27 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.815 15.372C23.8705 14.924 23.9121 14.476 23.9121 14C23.9121 13.524 23.8705 13.076 23.815 12.628L26.7434 10.318C27.0071 10.108 27.0765 9.73004 26.9099 9.42204L24.1342 4.57805C24.0523 4.43361 23.9222 4.32328 23.7671 4.26684C23.6119 4.2104 23.4419 4.21154 23.2876 4.27006L19.8318 5.67005C19.1101 5.11005 18.3329 4.64805 17.4863 4.29806L16.9589 0.588064C16.9359 0.423342 16.8542 0.27273 16.729 0.164475C16.6037 0.0562213 16.4437 -0.00223682 16.2788 6.55043e-05H10.7273C10.3804 6.55043e-05 10.0889 0.252065 10.0473 0.588064L9.51987 4.29806C8.67327 4.64805 7.89606 5.12405 7.17437 5.67005L3.71857 4.27006C3.6381 4.24252 3.55373 4.22833 3.46875 4.22806C3.23281 4.22806 2.99688 4.35405 2.87197 4.57805L0.0962233 9.42204C-0.0842 9.73004 -0.000927518 10.108 0.262768 10.318L3.19118 12.628C3.13566 13.076 3.09403 13.538 3.09403 14C3.09403 14.462 3.13566 14.924 3.19118 15.372L0.262768 17.682C-0.000927518 17.892 -0.0703213 18.27 0.0962233 18.578L2.87197 23.422C2.95378 23.5665 3.08392 23.6768 3.23906 23.7332C3.3942 23.7897 3.56419 23.7885 3.71857 23.73L7.17437 22.33C7.89606 22.89 8.67327 23.352 9.51987 23.702L10.0473 27.412C10.0889 27.748 10.3804 28 10.7273 28H16.2788C16.6258 28 16.9172 27.748 16.9589 27.412L17.4863 23.702C18.3329 23.352 19.1101 22.876 19.8318 22.33L23.2876 23.73C23.3708 23.758 23.4541 23.772 23.5374 23.772C23.7733 23.772 24.0093 23.646 24.1342 23.422L26.9099 18.578C27.0765 18.27 27.0071 17.892 26.7434 17.682L23.815 15.372ZM21.067 12.978C21.1225 13.412 21.1364 13.706 21.1364 14C21.1364 14.294 21.1086 14.602 21.067 15.022L20.8727 16.604L22.1079 17.584L23.6068 18.76L22.6353 20.454L20.8727 19.74L19.4293 19.152L18.1802 20.104C17.5834 20.552 17.0144 20.888 16.4454 21.126L14.9742 21.728L14.7521 23.31L14.4746 25.2H12.5316L12.2679 23.31L12.0458 21.728L10.5747 21.126C9.97787 20.874 9.42272 20.552 8.86757 20.132L7.60461 19.152L6.13347 19.754L4.37087 20.468L3.39936 18.774L4.89826 17.598L6.13347 16.618L5.93916 15.036C5.89753 14.602 5.86977 14.28 5.86977 14C5.86977 13.72 5.89753 13.398 5.93916 12.978L6.13347 11.396L4.89826 10.416L3.39936 9.24004L4.37087 7.54605L6.13347 8.26005L7.57685 8.84804L8.82594 7.89605C9.42272 7.44805 9.99175 7.11205 10.5608 6.87405L12.0319 6.27205L12.254 4.69005L12.5316 2.80006H14.4607L14.7244 4.69005L14.9465 6.27205L16.4176 6.87405C17.0144 7.12605 17.5695 7.44805 18.1247 7.86805L19.3876 8.84804L20.8588 8.24605L22.6214 7.53205L23.5929 9.22604L22.1079 10.416L20.8727 11.396L21.067 12.978ZM13.5031 8.40005C10.4359 8.40005 7.95158 10.906 7.95158 14C7.95158 17.094 10.4359 19.6 13.5031 19.6C16.5703 19.6 19.0546 17.094 19.0546 14C19.0546 10.906 16.5703 8.40005 13.5031 8.40005ZM13.5031 16.8C11.9764 16.8 10.7273 15.54 10.7273 14C10.7273 12.46 11.9764 11.2 13.5031 11.2C15.0297 11.2 16.2788 12.46 16.2788 14C16.2788 15.54 15.0297 16.8 13.5031 16.8Z"
                        fill="#9A9A9A"
                      />
                    </svg>
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
