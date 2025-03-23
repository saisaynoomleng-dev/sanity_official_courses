import type { Metadata } from "next";
import "../globals.css";
import { SanityLive } from "@/sanity/live";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Sanity Course",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      {children}
      <SanityLive />
    </section>
  );
}
