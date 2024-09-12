import React from 'react';
import { Container } from '@chakra-ui/react';
import Sidebar from './sidebar/page';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if(session?.user?.role !== 'Admin') {
    redirect('/login');
  }

  if(session?.user?.role === 'User') {
    redirect('/user/dashboard')
  }

  return (
    <Container p={0} maxW="100%" m={0}>
     <Sidebar />
    </Container>
  );
};

export default Admin;
