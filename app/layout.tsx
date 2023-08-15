import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import ToasterProvider from "@/components/ToasterProvider";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export const revalidate = 0;

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
