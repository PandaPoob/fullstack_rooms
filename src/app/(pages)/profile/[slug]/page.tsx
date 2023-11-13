import { requireAuthentication } from "@/app/_middleware/authentication";
import ProfileView from "@/app/_views/Profile";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getData(params: { slug: string }) {
  const session = await requireAuthentication(authOptions);

  //validate that a user can only access their own profile // compare params with session
  //find user profile

  if (!params.slug) {
    redirect("/error");
  } else {
    const profile = await db.user.findUnique({
      where: {
        id: params.slug as string,
      },
      select: {
        first_name: true,
        last_name: true,
        birthday: true,
        status: true,
        avatar_img: true,
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
}

async function ProfilePage({ params }: { params: { slug: string } }) {
  const data = await getData(params);
  return (
    data && (
      <ProfileView profile={data.profile} sessionUser={data.session.user} />
    )
  );
}

export default ProfilePage;
