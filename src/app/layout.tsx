import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StickyNavbar } from "@/components/Navbar";
import Toast from "@/components/Toast";
import { GlobalProvider } from "@/context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "V360 TodoList",
  description: "Gerencie suas tarefas de forma eficiente com o V360 TodoList",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <GlobalProvider>
          <StickyNavbar />
          <Toast />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
