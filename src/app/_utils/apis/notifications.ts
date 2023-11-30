"use client";
import { QueryClient } from "react-query";

interface UserId {
  user_id: string;
}

export async function InvalidateNotificationsForUsers(
  userIds: UserId[],
  queryClient: QueryClient
) {
  await Promise.all(
    userIds.map(async (user) => {
      await queryClient.invalidateQueries(["notifications", user.user_id]);
    })
  );
}
