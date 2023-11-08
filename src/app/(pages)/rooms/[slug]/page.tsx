import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma-client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RoomView from "@/app/_views/Room";

async function getData(params: { slug: string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  if (!params.slug) {
    redirect("/error");
  } else {
    const room = await db.room.findUnique({
      where: {
        id: params.slug as string,
        participants: {
          some: {
            user_id: session.user.id as string,
          },
        },
      },
      include: {
        // Include NoteWidget and its NoteItems
        noteWidget: {
          include: {
            noteItem: true,
          },
        },
      },
    });

    if (!room) {
      redirect("/error");
    }

    const data = {
      room,
      session,
    };

    return data;
  }
}

async function RoomPage({ params }: { params: { slug: string } }) {
  const data = await getData(params);
  console.log(data.room);
  return data && <RoomView room={data.room} sessionUser={data.session.user} />;
}

export default RoomPage;

// import { authOptions } from "@/lib/auth";
// import { db } from "@/lib/prisma-client";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import RoomView from "@/app/_views/Room";

// async function getData(params: { slug: string }) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     redirect("/");
//   }

//   if (!params.slug) {
//     redirect("/error");
//   } else {
//     const room = await db.room.findUnique({
//       where: {
//         id: params.slug as string,
//         participants: {
//           some: {
//             user_id: session.user.id as string,
//           },
//         },
//       },
//     });
//     if (!room) {
//       redirect("/error");
//     }

//     // Get notes, no need to redirect
//     const note = await db.noteItem.findMany({
//       take: 20,
//       where: {
//         title: {
//           contains: "Prisma",
//         },
//         text: {
//           contains: "Prisma",
//         },
//       },
//       orderBy: {
//         title: "desc",
//       },
//     });

//     const data = {
//       room,
//       session,
//       note,
//     };
//     return data;
//   }
// }

// async function RoomPage({ params }: { params: { slug: string } }) {
//   const data = await getData(params);
//   return data && <RoomView room={data.room} sessionUser={data.session.user} />;
// }

// export default RoomPage;
