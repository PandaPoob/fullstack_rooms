import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: String;
    first_name: String;
    last_name: String;
  }
  interface Session {
    user: User & {
      id: String;
      first_name: String;
      last_name: String;
    };
    token: {
      id: String;
      first_name: String;
      last_name: String;
      sub: String;
    };
  }
}
