import "../globals.css";

//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const gotham = localFont({
  src: "../_fonts/GothamBook.ttf",
  display: "swap",
});

/* const myFont = localFont({
  src: "./my-font.woff2",
  display: "swap",
}); */
/* export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}; */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={gotham.className}>
        <div className="bg-warning">{children}</div>
      </body>
    </html>
  );
}
