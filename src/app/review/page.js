"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  useToast,
  Heading,
  Stack,
  Select,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ReviewPage = () => {
  const params = useSearchParams();
  const productId = params.get('id');

  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleSubmit = async () => {

    const endpoint = await fetch("http://localhost:8000/api/books/review", {
      method: "POST",
      body: JSON.stringify({
        productId,
        title,
        content: review,
        rating,
        name,
        email

      }),
      headers: {
        "Content-Type" : "application/json"
      }
    })

    const response = await endpoint.json();

    
    if(response.success) {
      toast({
        title: "Review Submitted",
        description: "Thank you for your review!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Review not Submitted",
        description: "Error while submitting review",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleStarClick = (num) => {
    setRating(num);
  };

  return (
    <Container maxW="container.x" py={8}>
      <Box textAlign="center">
        <Heading mb={6} mt={5} fontSize={25} color="#444444">
          Write a Review
        </Heading>
        <Flex direction="column" align="center" gap={6}>
          <FormControl textAlign="center" maxWidth="md" mx="auto">
            <FormLabel textAlign="center" color="#616161" mb={3}>Rating</FormLabel>
       
            <Box mt={2}>
              {[1, 2, 3, 4, 5].map((num) => (
                <StarIcon
                  key={num}
                  color={num <= rating ? 'yellow.400' : 'gray.300'}
                  boxSize={6}
                  mr={1}
            
                  borderColor="yellow.400"
                  borderRadius="full"
                  onClick={() => handleStarClick(num)}
                  cursor="pointer"
                />
              ))}
            </Box>
          </FormControl>

          <FormControl textAlign="center" maxWidth="md" mx="auto">
            <FormLabel textAlign="center" color="#616161">Review Title</FormLabel>
            <Input
              placeholder="Give your review a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              color="black" 
              border="1px solid black"
              borderRadius="none" 
              _placeholder={{ color: 'gray.400' }} 
            />
          </FormControl>

          <FormControl textAlign="center" maxWidth="md" mx="auto">
            <FormLabel color="#616161">Review</FormLabel>
            <Textarea
              placeholder="Write your comments here"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </FormControl>

          <FormControl textAlign="center" maxWidth="md" mx="auto">
            <FormLabel color="#616161">Picture/Video (optional)</FormLabel>
            <Input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormControl>

          <FormControl textAlign="center" maxWidth="md" mx="auto">
            <FormLabel color="#616161">Name (displayed publicly)</FormLabel>
            <Input
              placeholder="Enter your name (public)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl textAlign="center" maxWidth="md" mx="auto">
            <FormLabel color="#616161">Email</FormLabel>
            <Input
              placeholder="Enter your email (private)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Text mt={4} fontSize="sm">
            How we use your data: We’ll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me’s terms, privacy and content policies.
          </Text>

          <Stack direction="row" spacing={4} mt={6} justify="center">
            <Button onClick={handleSubmit} colorScheme="blue">
              Submit Review
            </Button>
            <Button onClick={() => window.history.back()} colorScheme="gray">
              Cancel
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Container>
  );
};

export default ReviewPage;
