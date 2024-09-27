"use client";
import useWishlist from "@/providers/WishlistState";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const { data } = useSession();
  const { wishlist, removeProductInWishlist } = useWishlist();

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/users/mywishlist", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       userId: data?.user?.userId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setWishlist(data.wishlists);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  const removeFromWishlist = (productId) => {
    removeProductInWishlist(productId);
  }

  return (
    <Box textAlign="" p={5}>
      <Heading mb={6} fontSize={25} color="#444444">
        My Wishlist
      </Heading>
      {wishlist &&
        wishlist?.map((item) => (
          <Card
            key={item.id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={item.image}
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
                <Heading size="md">{item?.name}</Heading>

                <Text py="2">{item?.description}</Text>
                <Text py="2">{item?.price}</Text>
              </CardBody>

              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Buy
                </Button>
                <Button
                  onClick={() => removeFromWishlist(item.id)}
                  variant="solid"
                  colorScheme="red"
                >
                  remove
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      <List></List>
    </Box>
  );
}
