import { getServerSession } from "next-auth";
import BaseLayout from "../_components/layout/BaseLayout";
import Provider from "../_components/providers/Provider";
import "../globals.css";
import localFont from "next/font/local";
import { authOptions } from "@/lib/auth";

const gotham = localFont({
  src: "../_fonts/GothamBook.ttf",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={gotham.className}>
        <Provider>
          <BaseLayout session={session ? true : false}>{children}</BaseLayout>
        </Provider>
      </body>
    </html>
  );
}
