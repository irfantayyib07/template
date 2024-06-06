import { useMode } from "@/config/theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Dashboard - Flower Store",
 description: "Flower Store Dashboard",
};

export default function DashboardLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <>
   <section className={inter.className}>
    {children}
   </section>
  </>
 );
}
