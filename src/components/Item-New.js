import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  ButtonGroup,
  useToast,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import { useSession } from "next-auth/react";
import Link from "next/link";
import useCart from "@/providers/CartState";

const Item = ({ id, image, name, author, price, discount }) => {
  const { data } = useSession();
  const toast = useToast();

  const { cart, addProduct, addInitialCartData } = useCart();

  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const discountedPrice = Math.abs(price * (discount / 100) - price);

  function isExist(productid) {
    return cart?.some((book) => book._id === productid);
  }

  const handleWishlist = async () => {
    const endpoint = await fetch(
      "http://localhost:8000/api/users/wishlist/add",
      {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          userId: data?.user?.userId,
          quantity: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resp = await endpoint.json();

    console.log(resp);

    setWishlist(resp.wishlist?.products);
  };

  const removeFromWishlist = async () => {
    const endpoint = await fetch(
      "http://localhost:8000/api/users/wishlist/remove",
      {
        method: "POST",
        body: JSON.stringify({
          productId: id,
          userId: data?.user?.userId,
          quantity: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resp = await endpoint.json();

    console.log(resp);

    setWishlist(resp.wishlist?.products);
  };

  useEffect(() => {
    console.log(wishlist);
    if (wishlist?.some((book) => book.product === id)) {
      setIsInWishlist(true);
    }
  }, [handleWishlist, wishlist]);

  const handleAddToBag = async () => {
    addProduct({ _id: id, image, quantity: 1, name, author, price, discount });

    // const endpoint = await fetch("http://localhost:8000/api/cart/addtocart", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     productId: id,
    //     userId: data?.user?.userId,
    //     quantity: 1
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const resp = await endpoint.json();

    // if (resp.success) {
    //   toast({
    //     title: `${resp.message}`,
    //     description: `${name} has been added to your bag.`,
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // } else {
    //   toast({
    //     title: `${resp.message}`,
    //     description: `${name} could not add into bag.`,
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }
  };

  return (
    <Box p={10}>
      <Image src={image} alt={name} borderRadius="md" />
      <Stack mt="4" spacing="3">
        <Link href={`/bookdisplay/${id}`}>
          <Heading size="sm" noOfLines={1} color="#000">
            {name}
          </Heading>
        </Link>
        <Text color="#1f4f95">{author}</Text>
        <Box display="flex" alignItems="center" gap={3}>
          <Text color="black.600" fontSize="xl">
            {`₹ ${discountedPrice}`}
          </Text>
          {discount > 0 ? (
            <>
              {" "}
              <Text as="s" color="gray.500" fontSize="md">
                {`₹ ${price}`}
              </Text>
              <Text color="green.500" fontSize="md">
                ({`${discount}`}%)
              </Text>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Stack>
      <ButtonGroup spacing="2" justifyContent="center" mt={4}>
        {isInWishlist ? (
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => removeFromWishlist()}
          >
            <IoMdHeart />
          </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => handleWishlist()}
          >
            <IoMdHeartEmpty />
          </Button>
        )}
        {isExist(id) ? (
          <Button>Go to Bag</Button>
        ) : (
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => handleAddToBag()}
          >
            Add to bag
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={handleWishlist}
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid transparent"
        >
          <IoMdHeartEmpty size={20} />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ItemNew;
