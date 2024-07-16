import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apolloWrapper";
import { NormalizedCacheObject } from "@apollo/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick & Morty API Explorer",
  description: "Learn more about the hit series!",
};

export default function RootLayout({
  children,
  initialApolloState,
}: {
  children: React.ReactNode;
  initialApolloState: never; // work around latest version of typescript in react issue
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper initialApolloState={initialApolloState}>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}