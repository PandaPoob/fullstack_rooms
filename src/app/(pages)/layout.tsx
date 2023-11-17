import { getServerSession } from "next-auth";
import BaseLayout from "../_components/layout/BaseLayout";
import Provider from "../_components/providers/Provider";
import "../globals.css";
import localFont from "next/font/local";
import { authOptions } from "@/lib/auth";

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
        <Provider>
          <BaseLayout session={session ? true : false}>{children}</BaseLayout>
        </Provider>
      </body>
    </html>
  );
}
