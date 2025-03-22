import type { Metadata } from "next";
import "../globals.css";
import { SanityLive } from "@/sanity/live";

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
      {children}
      <SanityLive />
    </section>
  );
}
