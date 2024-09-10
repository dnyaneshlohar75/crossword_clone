import React from 'react';
import {
  Container,
} from '@chakra-ui/react';
import Header from '@/app/admin/header/page';
import HeaderSection from '@/app/admin/headersection/page';
import Sidebar from './sidebar/page';

const Admin = () => {
  return (
    <Container p={0} maxW="100%" m={0}>
     <Header /> 
     <HeaderSection />   
     <Sidebar/>
     
    </Container>
  );
};

export default Admin;
