"use client";

import { useEffect, useState } from "react";
import { Box, Heading, Image, Text, IconButton, Container, SimpleGrid, Divider } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Header from '@/app/admin/header/page';
import HeaderSection from '@/app/admin/headersection/page';
import Sidebar from '../sidebar/page';

const ListBook = () => {
    const [allbooks, setAllBooks] = useState([]);

    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/books/allbook'); 
            const data = await response.json();
            setAllBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    // Remove a book by ID
    const removeBook = async (id) => {
        try {
            await fetch('http://localhost:8000/books/removebook', { 
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            fetchInfo(); 
        } catch (error) {
            console.error('Error removing book:', error);
        }
    };

    return (
        <Container maxW="container.x" p={4}>
            <Header /> 
            <HeaderSection />

            <Box display="flex">
                <Sidebar />

                <Box flex="1" p={4}>
                    <Heading mb={4}>All Books List</Heading>
                    <SimpleGrid columns={5} spacing={4} mb={4} fontWeight="bold">
                        <Text>Image</Text>
                        <Text>Book Name</Text>
                        <Text>Price</Text>
                        <Text>Category</Text>
                        <Text>Remove</Text>
                    </SimpleGrid>
                    <Divider mb={4} />
                    {allbooks.length > 0 ? (
                        allbooks.map((book) => (
                            <Box key={book._id} p={4} borderWidth={1} borderRadius="md" mb={4} display="grid" gridTemplateColumns="1fr 2fr 1fr 1fr 1fr" alignItems="center">
                                <Image src={book.image} alt={book.name} boxSize="50px" objectFit="cover" borderRadius="md" />
                                <Text>{book.name}</Text>
                                <Text>${book.price}</Text>
                                <Text>{book.category}</Text>
                                <IconButton
                                    aria-label="Remove book"
                                    icon={<CloseIcon />}
                                    onClick={() => removeBook(book._id)}
                                />
                            </Box>
                        ))
                    ) : (
                        <Text>No books available.</Text>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default ListBook;
