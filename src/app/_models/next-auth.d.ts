import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: String;
    first_name: String;
    last_name: String;
    status: String;
    unreadNotif: number;
  }
  interface Session {
    user: User & {
      id: String;
      first_name: String;
      last_name: String;
      image: String | undefined;
    };
    token: {
      id: String;
      first_name: String;
      last_name: String;
      status: String;
      sub: String;
      unreadNotif: number;
    };
  }
}
