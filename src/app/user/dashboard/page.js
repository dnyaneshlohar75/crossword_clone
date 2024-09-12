import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LogoutButton from '@/components/LogoutButton';
import { Box, Container, Heading } from '@chakra-ui/react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession(authOptions);

  if(session?.user?.role !== 'User') {
    redirect('/login');
  }

  if(session?.user?.role === 'Admin') {
    redirect('/admin')
  }

  return (
    <Container p={0} maxW="100%" m={0}>
      <Box>
        <Heading>I am Logged In</Heading>
        <LogoutButton />
    </Box>
    </Container>
  )
}