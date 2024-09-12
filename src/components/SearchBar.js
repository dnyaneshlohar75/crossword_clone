"use client";

import { Button, Flex, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const url = new URL("http://localhost:3000/search");
    url.searchParams.set("query", searchQuery);

    router.push(url.toString());
  };

  return (
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
        _placeholder={{ color: "gray.500" }}
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
        _hover={{ bg: "gray.800" }}
        zIndex="2"
        onClick={handleSearch}
      >
        <AiOutlineSearch size={20} />
      </Button>
    </Flex>
  );
}
