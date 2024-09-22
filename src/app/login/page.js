"use client";

import { Box, Container, Image, Text, FormControl, FormLabel, Input, Button, Flex, Divider, useToast, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Login = () => {

  const { status, data } = useSession();

  if(status === 'authenticated') {
    if(data?.user?.role === 'User') {
      redirect('/user/dashboard')
    } else if(data?.user?.role === 'Admin') {
      redirect('/admin')
    }
  }
  
  const toast = useToast();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    signIn('credentials', {
      email: emailId,
      password: password
    }).then((result) => {
        setLoading(false);
    });
  }

  return (
    <Container maxW="container.x">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
      >
        <Image
          src="/images/login.png"
          alt="Image"
          maxW={{ base: "100%", md: "50%" }}
          height="auto"
        />
        <Box flex="1" ml={150}>
          <Text fontSize="2xl" mb={4} mr={40} textAlign="center">Sign In</Text>
          <Divider mb={8} w={400} /> 
            <FormControl id="mobileNo" isRequired mb={4}>
              <FormLabel>Email id</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmailId(e.target.value)}
                mb={4}
                w={400}
              />
            </FormControl>
            

            <FormControl id="mobileNo" isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                mb={4}
                w={400}
              />
            </FormControl>
            <Button
              type="submit"
              bg="black" 
              color="white" 
              width="400px"
              height={10}
              onClick={handleLogin}
              isLoading = {loading}
            >
              Login
            </Button>

            <Text fontSize="initial" mt={4} textAlign="center">
              You don't have an account?{" "}
              <Link href = "/signup" style={{
                textDecoration: "underline"
              }}>signup now</Link>
            </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
