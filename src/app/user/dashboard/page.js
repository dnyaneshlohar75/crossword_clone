"use client";

import CategoryTags from '@/components/Categorytags';
import Header from '@/components/header';
import HeaderSection from '@/components/HeaderSection';
import { Box, Button, Container, Heading } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
  const { data, status } = useSession();

  useEffect(() => {
    if(status === "unauthenticated") {
        redirect("/login");
    }
  }, [status]);

  return (
    <Container p={0} maxW="100%" m={0}>
     <Header /> 
     <HeaderSection />
     <CategoryTags/>
      <Box>
        <Heading>I am Logged In</Heading>
        <Button onClick={() => signOut({
            redirect: "/login"
        })}>Logout</Button>
    </Box>
    </Container>
  )
}