"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, Heading, Image, Table, TableContainer, Tbody, Th, Tr, Td, Thead } from "@chakra-ui/react";
import CategoryTags from "@/components/Categorytags";
import Header from "@/components/header";
import HeaderSection from "@/components/HeaderSection";
import { useSession } from "next-auth/react";

export default function Page() {
  const [carts, setCarts] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    if (data?.user?.userId) {
      fetch("http://localhost:8000/api/cart", {
        method: "POST",
        body: JSON.stringify({ userId: data.user.userId }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data); 
          setCarts(data.carts);
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [data?.user?.userId]);
  

  function calculateTotal() {
    let total = 0;
    carts.map((cart) => {
      cart.products.map((product) => {
        total += Math.abs((product.product.price * (product.product.discount/100)) - product.product.price) * product.quantity
      })
    })

    return total;
  }

  const deleteProduct = async (id) => {
    try {
      console.log({userId: data?.user?.userId, id});

      const api = await fetch("http://localhost:8000/api/cart/remove", {
        method: "DELETE",
        body: JSON.stringify({
          userId: data?.user?.userId,
          productId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resp = await api.json()

      console.log(resp);

      setCarts(resp.carts);

    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <Container p={0} maxW="100%" m={0}>
    <Header />
    <HeaderSection />
    <CategoryTags />

    {carts.length > 0 ? ( 
      <TableContainer>
        <Table variant="simple">
          <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Image</Th>
                <Th>Category</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Edit</Th>
              </Tr>
          </Thead>
          <Tbody>
            {carts.map((cart) => (
              <>
                {carts.map((cart) => (              
                  <>
                  {cart.products.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.product.name}</Td>
                      <Td>
                        <Image
                          src={product.product.image}
                          alt={product.product.name}
                          boxSize="50px"
                        />
                      </Td>
                      <Td>{product.product.category}</Td>
                      <Td>{product.quantity}</Td>
                      <Td>{Math.abs((product.product.price * (product.product.discount/100)) - product.product.price)}</Td>
                      <Td>
                        <Button onClick={() => deleteProduct(product?.product?._id)}>
                          Delete product
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                  </>
              ))}
              </>
            ))}
             <Box mt={4}>
                <Heading size="md">Total Amount: ₹ {calculateTotal().toFixed(2)}</Heading>
              </Box>
          </Tbody>
        </Table>
      </TableContainer>
    ) : (
      <Box>Your cart is empty</Box>
    )}
  </Container>
  );
}