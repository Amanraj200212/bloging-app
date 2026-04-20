// this  is the shared layout page. it only write in middle bracket and it doesnot create any routes

import { Navbar } from "@/components/web/navbar";

export default function SharedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}