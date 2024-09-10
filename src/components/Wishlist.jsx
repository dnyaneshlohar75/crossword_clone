"use client";


import { Box, Button, Card, CardBody, CardFooter, Heading, Image, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function Wishlist() {
  const [myWishlists, setWishlist] = useState();
  const { data } = useSession();

  useEffect(() => {
    fetch("http://localhost:8000/api/users/mywishlist", {
      method: "POST",
      body: JSON.stringify({
        userId: data?.user?.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWishlist(data.wishlists);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(myWishlists);


  return (
    <Box textAlign="" p={5}>
        <Heading mb={6} fontSize={25} color="#444444">
          My Wishlist
        </Heading>
        {myWishlists?.map((wishlist) => (
          <>
            {wishlist?.products?.map((product) => (
              <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={product?.product?.image}
                alt='Caffe Latte'
              />
            
              <Stack>
                <CardBody>
                  <Heading size='md'>{product?.product?.name}</Heading>
            
                  <Text py='2'>
                    {product?.product?.description}
                  </Text>
                  <Text py='2'>
                    {product?.product?.price}
                  </Text>
                </CardBody>
            
                <CardFooter>
                  <Button variant='solid' colorScheme='blue'>
                    Buy Latte
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
            ))}
          </>
        ))}
        <List>
          
        </List>
    </Box>
  )
}