import {
  Image,
  Table,
  TableContainer,
  Tbody,
  Th,
  Tr,
  Td,
  Thead
} from "@chakra-ui/react";
import React from "react";

export default function MyBag({ data }) {
    data.products?.forEach((product) => {
        console.log(product.product)
    })

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Category</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
            {data.products.forEach((cart) => (
                <Td>{cart.name}</Td>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
