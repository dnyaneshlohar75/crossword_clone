"use client";

import React from 'react';
import { Box, Flex, Image, Text, Avatar, Badge } from '@chakra-ui/react';
import { IoPersonSharp, IoBagOutline } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useCart from '@/providers/CartState';
import SearchBar from './SearchBar';

const HeaderSection = () => {

  const { cart } = useCart();
  const { data, status } = useSession();

  return (
    <Box
      maxW="100vw"
      minH="8vh"
      position="relative"
      color="black"
      bg="#FFE619"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      mx="auto"
    >
      <Flex align="center" mr={4}>
          <Image
            src="/images/logo.png"
            alt="logo"
            boxSize="70px"
            mr={4}
          />
        <Link href="/">
          <Text fontSize="lg">CROSSWORD</Text>
        </Link>
      </Flex>

      <SearchBar />

      <Flex align="center" ml="auto">
        {status === 'authenticated' ? 
        <Link href = {data?.user?.role === "User" ? "/user/dashboard" : "/admin"}>
          <Avatar
            size = "sm"
            name = {data?.user?.name}
            src = {data?.user?.image}
          />
        </Link>
        :
        <Link href = "/login">
          <IoPersonSharp size={24} />
        </Link>
        }
        
        <Link href = "/wishlist">
          <FaHeart size={24} style={{ marginLeft: 20 }} />
        </Link>
        <Link href = "/mybag" style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          <IoBagOutline size={24} style={{ marginLeft: 20 }} />
          <Badge colorScheme='green' >
            {cart?.length || 0}
          </Badge>
        </Link>
      </Flex>
    </Box>
  );
};

export default HeaderSection;
