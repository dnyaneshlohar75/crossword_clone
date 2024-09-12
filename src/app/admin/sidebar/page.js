'use client'; 

import LogoutButton from '@/components/LogoutButton';
import { Box, Flex, Text, Link as ChakraLink, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (  
      <Box 
        width="250px" 
        height="90vh" 
        bg="gray.800" 
        color="white" 
        p="10"
      >
        <Flex direction="column" gap="10">
          <ChakraLink 
            onClick={() => handleNavigation('/admin/addbook')}
            _hover={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Flex align="center" gap="4">
              <Image
                src="/images/list.png"
                alt="add product"
                boxSize="40px"
                borderRadius={5}
                mr={4}
              /> 
              <Text fontWeight={600}>Add Product</Text>
            </Flex>
          </ChakraLink>
          
          <ChakraLink 
            onClick={() => handleNavigation('/admin/listbook')}
            _hover={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Flex align="center" gap="4">
              <Image
                src="/images/list.png"
                alt="product list"
                boxSize="40px"
                borderRadius={5}
                mr={4}
              />
              <Text fontWeight={600}>Product List</Text>
            </Flex>
          </ChakraLink>
          <LogoutButton />
        </Flex>
      </Box>
  );
};

export default Sidebar;
