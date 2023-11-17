"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

function ProfileInfoBanner() {
  const { data: session } = useSession();

  return (
    <div className="p-6 flex gap-4 items-center">
      <div className="relative min-w-[4rem] h-full min-h-[4rem] overflow-hidden rounded-full">
        <Image
          src={session?.user.image ? session.user.image : "/default_avatar.png"}
          alt={"avatar picture"}
          style={{ objectFit: "cover" }}
          fill={true}
          className="filter group-hover:brightness-90 transition"
        />
      </div>
      <div>
        <h3 className="text-h5">
          {session?.user.first_name + " " + session?.user.last_name}
        </h3>
        <span className="text-xs text-secondary">{session?.user.email}</span>
      </div>
    </div>
  );
}

export default ProfileInfoBanner;
