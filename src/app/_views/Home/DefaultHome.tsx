import Image from "next/image";
import Link from "next/link";

function DefaultHome() {
  return (
    <main className="pt-16 lg:h-screen lg:grid lg:items-center">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[6.25rem] max-h-[28rem] min-w-[5.5rem] lg:min-h-[28rem] lg:min-w-[28rem]">
          <Image
            src={"/logo.svg"}
            fill={true}
            alt={"Logo"}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="mt-10 lg:mt-0 grid gap-20">
          <h2 className="text-h2 lg:text-h1 font-medium leading-[134%]">
            Share and organize your daily life with Rooms
          </h2>
          <Link href="/signup" className="text-h3 lg:text-h2 font-medium">
            <span className="font-medium">Sign up today</span>
          </Link>

          <span className="text-h3 leading-[134%] font-medium lg:text-h2">
            Already have an account?{" "}
            <Link href="/login" className="font-medium">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}

export default DefaultHome;
