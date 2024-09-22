"use client";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Container,
  Flex,
  ButtonGroup,
  Image,
  Select,
  Text,
  VStack,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from "@chakra-ui/react";
import { ChevronRightIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NextLink from "next/link";

const BookDisplay = ({ params }) => {
  const { data } = useSession();

  const productId = params.id;
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const toast = useToast();
  
  const calculateAvarageRating = () => {
    let r = 0;
    reviews?.map((review) => {
      r += review?.rating;
    });

    return (r / reviews?.length).toFixed(2);
  };

  const rating = calculateAvarageRating();

  const handleAddToBag = async () => {
    const endpoint = await fetch("http://localhost:8000/api/cart/addtocart", {
      method: "POST",
      body: JSON.stringify({
        productId,
        userId: data?.user?.userId,
        quantity: 1,
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
      const endpoint = await fetch(
        `http://localhost:8000/api/books/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const getReviews = await fetch(
        `http://localhost:8000/api/books/reviews/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const reviews = await getReviews.json();

      setReviews(reviews?.reviews);

      const data = await endpoint.json();
      console.log({ data });
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
        <Breadcrumb py={6} separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              fontSize="16px"
              color="#4d4d4d"
              textDecoration="none"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/books" color="#4d4d4d" textDecoration="none">
              {product?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Flex
        flexDirection="row"
        gap="28px"
        justifyContent="space-between"
        alignItems="start"
      >
        <Box
          flexBasis="3/12"
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

        <Box flexBasis="4/12">
          <Image
            src={product?.image}
            alt="Book cover"
            width={396}
            height={426}
            objectFit="cover"
          />
        </Box>

        <Box flex="1">
          <VStack align="start" spacing={4}>
            <Text fontSize="3xl" fontWeight={600}>
              {product?.name}
            </Text>
            <Text fontSize="sm" color="#1f4f95" mt={-2}>
              {product?.author}
            </Text>

            <Box display={"flex"} alignItems="center" gap="10">
              <Box display={"flex"} alignItems="center" gap="4">
                <Text fontSize="3xl" fontWeight={600}>
                  ₹{" "}
                  {Math.abs(
                    product?.price * (product?.discount / 100) - product?.price
                  )}
                </Text>
                <Text as="s" color="gray" fontSize="medium">
                  ₹ {product?.price}
                </Text>
                <Text fontWeight="600" fontSize="large" color="green">
                  {`(${product?.discount}% OFF)`}
                </Text>
              </Box>
            </Box>
            <Text
              fontSize="smaller"
              color="GrayText"
            >{`(Inclusive of all taxes)`}</Text>

            <Select
              width="80px"
              variant="outline"
              borderColor="black"
              color="black"
              mb={6}
              _hover={{ borderColor: "gray.600" }}
              _focus={{ borderColor: "black", boxShadow: "none" }}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Select>

            <Box display="flex" alignItems="center" marginLeft="0px">
              <ButtonGroup
                variant="outline"
                spacing="6"
                size="lg"
                marginRight="8px"
              >
                <Button
                  colorScheme="black"
                  fontSize="15px"
                  letterSpacing="0.5px"
                  padding="12px 80px"
                  _hover={{ bg: "black", color: "white" }}
                  _active={{ bg: "black", color: "white" }}
                  borderColor="black"
                  onClick={handleAddToBag}
                >
                  ADD TO BAG
                </Button>
              </ButtonGroup>
              <ButtonGroup variant="outline" spacing="6" size="lg">
                <Button
                  bg="black"
                  color="white"
                  fontSize="15px"
                  borderColor="black"
                  letterSpacing="0.5px"
                  padding="12px 80px"
                  _hover={{ bg: "white", color: "black" }}
                  _active={{ bg: "white", color: "black" }}
                >
                  BUY IT NOW
                </Button>
              </ButtonGroup>
            </Box>

            <Box
              mt={8}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="2xl" fontWeight={500}>
                Description
              </Text>

              <Button
                bg="black"
                color="white"
                fontSize="14px"
                borderColor="black"
                marginLeft={350}
                letterSpacing="0.5px"
                padding="12px 30px"
                leftIcon={<EditIcon />}
                onClick={handleWriteReview}
              >
                Write a Review
              </Button>
            </Box>
            <Box>
              <Text mt={2} noOfLines="2" fontSize="small">
                A compelling and powerful book that explores the intricacies of
                human emotions and relationships through a gripping narrative.
                Discover the depth of the characters and the richness of the
                story that will keep you hooked till the very end.
              </Text>
              <Link
                href="#product_description"
                as={NextLink}
                fontSize="small"
                target=""
                fontWeight="600"
              >
                Read more
              </Link>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Box border="1px 0 1px 0 solid gray" marginY="18px">
        <Text fontSize="2xl" fontWeight={600}>
          You may also like
        </Text>
      </Box>

      <Box marginY="18px">
        <Text fontSize="2xl" fontWeight={600}>
          Product Description
        </Text>
        <Text mt={2} fontSize="medium">
          A compelling and powerful book that explores the intricacies of human
          emotions and relationships through a gripping narrative. Discover the
          depth of the characters and the richness of the story that will keep
          you hooked till the very end.
        </Text>
      </Box>

      <Box marginY="18px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight={600}>
            Customer Reviews
          </Text>
          <Button
            bg="black"
            color="white"
            fontSize="14px"
            borderColor="black"
            marginLeft={350}
            letterSpacing="0.5px"
            padding="12px 30px"
            leftIcon={<EditIcon />}
            onClick={handleWriteReview}
          >
            Write a Review
          </Button>
        </Flex>

        {reviews?.length > 0 ?
        <Box display="flex" alignItems="center" gap="3">
        <Box>
          {Array.from({ length: Math.floor(rating) }).map((x) => (
            <StarIcon
              key={x}
              color="yellow.400"
              boxSize={6}
              borderColor="yellow.400"
              borderRadius="full"
              cursor="pointer"
            />
          ))}
        </Box>
        <Text>
          {rating || 0} out of 5 Based on {reviews?.length} reviews
        </Text>
      </Box>
      :
      <Box display="flex" alignItems="center" gap="3">
        <Box>
          {Array.from({ length: 5 }).map((x) => (
            <StarIcon
              key={x}
              boxSize={6}
              borderColor="yellow.400"
              borderRadius="full"
              cursor="pointer"
            />
          ))}
        </Box>
        <Text>
        Be the first to write a review
        </Text>
      </Box>
      }
      </Box>
    </Container>
  );
};

export default BookDisplay;
