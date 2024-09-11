import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  ButtonGroup,
  useToast,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useCart from "@/providers/CartState";

const Item = ({ id, image, name, author, price, discount }) => {
  const { data } = useSession();
  const toast = useToast();

  const { cart, addProduct, addInitialCartData } = useCart();

  //Math.abs((product.product.price * (product.product.discount/100)) - product.product.price);

  const discountedPrice = Math.abs((price * (discount/100)) - price);

  const handleWishlist = async () => {

    const endpoint = await fetch("http://localhost:8000/api/users/wishlist/add", {
      method: "POST",
      body: JSON.stringify({
        productId: id,
        userId: data?.user?.userId,
        quantity: 1
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp = await endpoint.json();

  }

  const handleAddToBag = async () => {
    addProduct({ _id: id, image, quantity: 1, name, author, price, discount })
    
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
    <Card maxW="sm">
      <CardBody>
        <Image src={image} alt={""} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Link href = {`/bookdisplay/${id}`}>
            <Heading size="sm" noOfLines={1}>{name}</Heading>
          </Link>
          <Text>{author}</Text>
          <Box display={"flex"} alignItems={"center"} gap={3}>
            <Text color="blue.600" fontSize="xl">
              {`₹ ${discountedPrice}`}
            </Text>
            <Text as='s' color="gray" fontSize="medium">
              {`₹ ${price}`}
            </Text>
            <Text color="gray" fontSize="medium">
              ({`${discount}`}%)
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue" onClick={() => handleWishlist()}>
            Wishlist
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={() => handleAddToBag()}>
            Add to bag
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Item;
