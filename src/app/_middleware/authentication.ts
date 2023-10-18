import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export function requireAuthentication(page: () => JSX.Element) {
  return async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/");
    }

    return page();
  };
}
