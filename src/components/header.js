'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react';
import { GrLocation } from "react-icons/gr";

const Header = () => {
  return (
    <Box 
      maxW="100vw" 
      height="30px"  
      position="relative"
      color="white"   
      bg="black"             
      display="flex"
      alignItems="center" 
      justifyContent="space-between" 
      p={4}
      mx="auto"  
    >
      <Flex align="center" ml="auto">
        <GrLocation size={15} /> 
        <Text fontSize="xs" ml={2}> 
          Find a store |
        </Text>
        <Text fontSize="xs" ml={2}> 
          Track your order |
        </Text>
        <Text fontSize="xs" ml={2}> 
          +918530206759
        </Text>
      </Flex>
    </Box>
  );
};

export default Header;
