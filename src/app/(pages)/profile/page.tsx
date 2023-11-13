import { requireAuthentication } from "@/app/_middleware/authentication";
import ProfileView from "@/app/_views/Profile";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { redirect } from "next/navigation";

async function getData(id: string) {
  const session = await requireAuthentication(authOptions);
  const profile = await db.user.findUnique({
    where: {
      id: id,
    },
    select: {
      first_name: true,
      last_name: true,
      birthday: true,
      status: true,
      avatar_img: true,
      id: true,
    },
  });
  if (!profile) {
    redirect("/error");
  }

  const data = {
    profile,
    session,
  };
  return data;
}

async function ProfilePage() {
  const session = await requireAuthentication(authOptions);

  const data = await getData(session.user.id as string);
  return data && <ProfileView profile={data?.profile} />;
}

export default ProfilePage;
