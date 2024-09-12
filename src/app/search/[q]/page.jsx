"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Card, CardBody, CardFooter, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function page({params}) {
  const [searchResults, setSearchResults] = useState();
  const query = params?.q;

  useEffect(() => {
    async function getBooks() {
      const response = await fetch(
        `http://localhost:8000/api/books/find/${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setSearchResults(data?.books);
    }

    getBooks();
  }, [query]);

  return (
    <Container p={0} maxW="100%" m={0}>
      <Box p={8}>
        <Heading fontSize={24}>Search Results</Heading>

        {searchResults?.map((result) => (
            <Card
            key={result._id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src={result?.image}
              alt=""
            />
  
            <Stack>
              <CardBody>
                <Heading size="md">{result.name}</Heading>
  
                <Text py="2">
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Text>
              </CardBody>
  
              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Buy Latte
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
