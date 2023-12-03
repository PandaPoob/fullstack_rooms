import { getServerSession } from "next-auth";
import BaseLayout from "../_components/layout/BaseLayout";
import AuthProvider from "../_components/providers/AuthProvider";
import "../globals.css";
import localFont from "next/font/local";
import { authOptions } from "@/lib/auth";
import QueryProvider from "../_components/providers/QueryProvider";

const gotham = localFont({
  // src: "../_fonts/GothamBook.ttf",
  src: [
    {
      path: "../_fonts/GothamBook.ttf",
      weight: "400",
    },
    {
      path: "../_fonts/GothamMedium.ttf",
      weight: "500",
    },
  ],
  variable: "--body-font",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${gotham.variable}`}>
      <body className={"font-body"}>
        <QueryProvider>
          <AuthProvider>
            <BaseLayout session={session ? true : false}>{children}</BaseLayout>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
