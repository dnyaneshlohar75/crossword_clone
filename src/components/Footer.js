import { Box, Container, Stack, Text, Link, SimpleGrid, VStack, Image, Flex, Divider } from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="#FFFFFF" p={10}>
      <Container maxW="container.xl" px={{ base: 4, md: 0 }}> 
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4} mb={{ base: 8, md: 0 }}>
            <Flex align="center">
              <Image
                src="/images/crossword.png"
                alt="logo"
                boxSize="80px"
                mr={4}
              />
              <Text fontSize="lg" fontWeight={600}>
                CROSSWORD
              </Text>
            </Flex>
            <Text fontSize="12px">
              Crossword Bookstores draws book lovers of all ages into a community where they can discover great books, engage with booklovers, and meet their favourite literary personalities.
            </Text>
            <Flex align="center" fontSize="12px">
              <MdEmail style={{ marginRight: '8px' }} />
              <Text>
                Email: <Link href="mailto:estore@crossword.in">estore@crossword.in</Link>
              </Text>
            </Flex>
            <Flex align="center" fontSize="12px">
              <FaWhatsapp style={{ marginRight: '8px' }} />
              <Text>
                Phone: <Link href="tel:+918530206759">+91 8530206759</Link>
              </Text>
            </Flex>
          </Stack>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            <VStack align="start">
              <Text fontWeight="bold">Category</Text>
              <Divider borderWidth="1px" mb={6} />
              <Link href="#" fontSize="13px">New & Noteworthy</Link>
              <Link href="#" fontSize="13px">Top 50</Link>
              <Link href="#" fontSize="13px">Crossword Recommends</Link>
              <Link href="#" fontSize="13px">Books</Link>
              <Link href="#" fontSize="13px">Kids Books</Link>
              <Link href="#" fontSize="13px">Toys & Games</Link>
              <Link href="#" fontSize="13px">Stationery & Gifts</Link>
              <Link href="#" fontSize="13px">Crossword Gift Card</Link>
              <Link href="#" fontSize="13px">The Write Place</Link>
            </VStack>
            <VStack align="start">
              <Text fontWeight="bold">Useful links</Text>
              <Divider borderWidth="1px" mb={6} />
              <Link href="#" fontSize="13px">Secure Shopping</Link>
              <Link href="#" fontSize="13px">Privacy Policy</Link>
              <Link href="#" fontSize="13px">Terms of Use</Link>
              <Link href="#" fontSize="13px">Shipping Policy</Link>
              <Link href="#" fontSize="13px">Returns Policy</Link>
              <Link href="#" fontSize="13px">Payment Option</Link>
              <Link href="#" fontSize="13px">Crossword Gift Card T&C</Link>
              <Link href="#" fontSize="13px">Crossword Events</Link>
            </VStack>
            <VStack align="start">
              <Text fontWeight="bold">About us</Text>
              <Divider borderWidth="1px" mb={6}/>
              <Link href="#" fontSize="13px">Store Locator</Link>
              <Link href="#" fontSize="13px">Kids Club</Link>
              <Link href="#" fontSize="13px">Blogs</Link>
              <Link href="#" fontSize="13px">Get in Touch</Link>
              <Link href="#" fontSize="13px">Careers</Link>
              <Link href="#" fontSize="13px">Become a Franchisee</Link>
              <Link href="#" fontSize="13px">Contact Us</Link>
            </VStack>
            <VStack align="start">
              <Text fontWeight="bold">Get in Touch</Text>
              <Divider mb={6} />
              <Link href="#" fontSize="13px">Careers</Link>
              <Link href="#" fontSize="13px">Become a Franchisee</Link>
              <Link href="#" fontSize="13px">Contact Us</Link>
            </VStack>
          </SimpleGrid>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
