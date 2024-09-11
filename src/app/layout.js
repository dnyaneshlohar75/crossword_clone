import { ChakraProvider, Container } from "@chakra-ui/react";
import AuthProvider from "../providers/AuthProvider";
import Header from "@/components/header";
import HeaderSection from "@/components/HeaderSection";
import CategoryTags from "@/components/Categorytags";
import { Montserrat } from 'next/font/google'

const font = Montserrat({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700"] })

import "./globals.css";

export const metadata = {
  title: "crossword",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          <ChakraProvider>
            <Container p={0} maxW="100%" m={0}>
              <Header />
              <HeaderSection />
              <CategoryTags />
              {children}
            </Container>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
