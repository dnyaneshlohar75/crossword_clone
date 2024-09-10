"use client";

import React, { useState } from 'react';
import { Box, Flex, Image, Text, Input, Button, Avatar } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoPersonSharp, IoBagOutline } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const HeaderSection = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data, status } = useSession();

  
  const handleSearch = () => {
    const url = new URL("http://localhost:3000/search");
    url.searchParams.set("query", searchQuery)

    router.push(url.toString());
  }

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

      <Flex
        align="center"
        width="50%"
        maxW="500px"
        mx={4}
        ml={250}
        position="relative"
      >
        <Input
          placeholder="Search by Title, Author, ISBN"
          bg="white"
          border="none"
          borderRadius="md"
          _placeholder={{ color: 'gray.500' }}
          size="sm"
          pr="4.5rem"
          zIndex="1"
          defaultValue={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          position="absolute"
          right="0"
          h="100%"
          px={4}
          colorScheme="blackAlpha"
          bg="black"
          color="white"
          borderRadius="md"
          _hover={{ bg: 'gray.800' }}
          zIndex="2"
          onClick={handleSearch}
        >
          <AiOutlineSearch size={20} />
        </Button>
      </Flex>

      <Flex align="center" ml="auto">
        {status === 'authenticated' ? 
        <Link href = "/user/dashboard">
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
        <Link href = "/mybag">
          <IoBagOutline size={24} style={{ marginLeft: 20 }} />
        </Link>
      </Flex>
    </Box>
  );
};

export default HeaderSection;
