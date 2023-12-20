import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import TanstackProvider from "@/Provders/TanstackProvider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lucid Dreams",
  description: "A blog about my lucid dreams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <Header />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
