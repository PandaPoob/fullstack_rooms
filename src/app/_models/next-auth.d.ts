import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    first_name: String;
    last_name: String;
  }
  interface Session {
    user: User & {
      first_name: String;
      last_name: String;
    };
    token: {
      first_name: String;
      last_name: String;
    };
  }
}
