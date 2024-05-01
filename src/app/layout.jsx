
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/header'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SnapText",
  description: "Drop a text to your friends in a snap!",
  icons: {
    icon: "/mail.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " h-screen"}>
        <Header/>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
