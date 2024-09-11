"use client";
import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  ButtonGroup,
  Image,
  Stack,
  Select ,
  Text,
  VStack,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { ChevronRightIcon, EditIcon} from '@chakra-ui/icons'; 
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const BookDisplay = ({params}) => {

  const { data } = useSession();

  const productId = params.id;
  const [product, setProduct] = useState({});
  const router = useRouter();

 

  const handleAddToBag = async () => {
    const endpoint = await fetch("http://localhost:8000/api/cart/addtocart", {
      method: "POST",
      body: JSON.stringify({
        productId,
        userId: data?.user?.userId,
        quantity: 1
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp = await endpoint.json();

    if (resp.success) {
      toast({
        title: `${resp.message}`,
        description: `${product?.name} has been added to your bag.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${resp.message}`,
        description: `${product?.name} could not add into bag.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    async function getBookById() {
      const endpoint = await fetch(`http://localhost:8000/api/books/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json"
        }
      })

      const data = await endpoint.json();
      console.log({data})
      setProduct(data.book);
    }

    getBookById();

  }, [productId]);

  const handleWriteReview = () => {
    router.push(`/review?id=${productId}`); 
  };

  return (
    <Container maxW="container.x" py={0}>
      <Box ml={8}>
        <Breadcrumb mb={6} separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" fontSize="16px" color="#4d4d4d" textDecoration="none">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/books" color="#4d4d4d" textDecoration="none">Book Name</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Flex direction={{ base: 'column', md: 'row' }} align="start" gap={6}>
        <Box
          p="3px"
          border="2px"
          borderColor="black"
          width="75px"
          height="110px"
          display="inline-block"
          ml={8}
        >
          <Image
            src={product?.image}
            alt="Book cover"
            width={65}
            height="100px"
            objectFit="cover"
          />
        </Box>

        <Box flex="1">
          <Image
            src={product?.image}
            alt="Book cover"
            width={400}
            height={500}
            marginLeft="80px"
            objectFit="cover"
          />
        </Box>

        <Box flex="1" mr={100}>
          <VStack align="start" spacing={4}>
            <Text fontSize="3xl" fontWeight={600}>{product?.name}</Text>
            <Text fontSize="sm" color="#1f4f95" mt={-2}>{product?.author}</Text>
            <Text fontSize="3xl" fontWeight={600}>₹ {product?.price}</Text>

            <Select  
              width="80px"
              variant="outline"
              borderColor="black"
              color="black"
              mb={6}
              _hover={{ borderColor: 'gray.600' }}
              _focus={{ borderColor: 'black', boxShadow: 'none' }}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>

 <Box display="flex" alignItems="center" marginLeft="0px">
  <ButtonGroup variant='outline' spacing='6' size='lg' marginRight="8px">
    <Button 
      colorScheme='black' 
      fontSize="15px" 
      letterSpacing="0.5px"
      padding="12px 80px" 
      _hover={{ bg: 'black', color: 'white' }} 
      _active={{ bg: 'black', color: 'white' }}
      borderColor='black'

      onClick={handleAddToBag}
    >
      ADD TO BAG
    </Button>
  </ButtonGroup>
  <ButtonGroup variant='outline' spacing='6' size='lg'>
    <Button 
      bg='black' 
      color='white'
      fontSize="15px" 
      borderColor='black'
      letterSpacing="0.5px"
      padding="12px 80px" 
      _hover={{ bg: 'white', color: 'black' }}
      _active={{ bg: 'white', color: 'black' }}  
    >
      BUY IT NOW
    </Button>
  </ButtonGroup>
</Box>


          <Box mt={8} display="flex">
              <Text fontSize="2xl" fontWeight={500}>Description</Text>
    
              <Button
                bg='black'
                color='white'
                fontSize="15px"
                borderColor='black'
                marginLeft={350}
                letterSpacing="0.5px"
                padding="12px 30px"
                leftIcon={<EditIcon />}
                onClick={handleWriteReview}
              >
                WRITE A REVIEW
              </Button>
            </Box>
            <Box>
              <Text mt={2}>
                A compelling and powerful book that explores the intricacies of human emotions and relationships through a gripping narrative.
                Discover the depth of the characters and the richness of the story that will keep you hooked till the very end.
              </Text>
            </Box>

            
          </VStack>
        </Box>

      </Flex>
      
    </Container>
  );
}

export default BookDisplay;
