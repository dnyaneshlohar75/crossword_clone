import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '../providers/AuthProvider'

export const metadata = {
  title: 'crossword',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
