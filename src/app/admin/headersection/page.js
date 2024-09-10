import React from 'react';
import { Box, Flex, Image, Text, Input, Button } from '@chakra-ui/react';

const HeaderSection = () => {
  return (
    <Box
      maxW="100vw"
      minH="15vh"
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
        <Text fontSize="lg">CROSSWORD</Text>
      </Flex>
      <Flex align="center" ml="1100">
        <Image
          src="/images/profile.jpg"
          alt="add product"
          boxSize="50px"
          mr={4}
          borderRadius="full"
        /> 
      </Flex>
    </Box>
  );
};

export default HeaderSection;
