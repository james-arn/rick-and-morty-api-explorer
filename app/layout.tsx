import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick & Morty API Explorer",
  description: "Learn more about the hit series!",
};

export default function RootLayout({
  children,
  initialApolloState,
}: Readonly<{
  children: React.ReactNode;
  initialApolloState: any;
}>) {
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