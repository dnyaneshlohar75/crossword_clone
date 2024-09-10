"use client"

import React from 'react';
import {
  Box, Text
} from '@chakra-ui/react';

const Header = () => {
  return (
    <Box 
      maxW="100vw" 
      height="50px"  
      position="relative"
      color="white"   
      bg="black"             
      display="flex"
      alignItems="center" 
      justifyContent="space-between" 
      p={4}
      mx="auto"  
    >
     <Text fontSize="xs" ml={1345}> 
          Admin Panel
        </Text>
    </Box>
  );
};

export default Header;
