"use client";

import CategoryTags from '@/components/Categorytags'
import Header from '@/components/header'
import HeaderSection from '@/components/HeaderSection'
import Wishlist from '@/components/Wishlist'
import { Container } from '@chakra-ui/react'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function page() {
  const { data, status } = useSession();

  if(status === 'unauthenticated') {
    redirect("/login");
  }

  return (
    <Container p={0} maxW="100%" m={0}>
     <Header /> 
     <HeaderSection />
     <CategoryTags />
     <Wishlist />
    </Container>
  )
}