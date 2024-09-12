import React from 'react';
import { Box, Flex, Menu, MenuButton, MenuList, MenuItem, Button, Grid, Text } from '@chakra-ui/react';

export const categories = [
  { 
    label: 'NEW & NOTEWORTHY', 
  },
  { label: 'TOP 50', options: ['Option 1', 'Option 2'] },
  { label: 'CROSSWORD RECOMMENDS', options: ['Option 1', 'Option 2'] },
  { label: 'BOOKS', options: ['Option 1', 'Option 2'] },
  { label: 'KIDS BOOKS', options: ['Option 1', 'Option 2'] },
  { label: 'Young Adult', options: ['Option 1', 'Option 2'] },
  { label: 'TOYS & GAMES', options: ['Option 1', 'Option 2'] },
  { label: 'STATIONERY & GIFTS', options: ['Option 1', 'Option 2'] },
  { label: 'SALE', options: ['Option 1', 'Option 2'] },
];


export const categoriesList = [
  'Fiction',
  'Non Fiction',
  'Business & Management',
  'Kids Books',
  'Young Adult',
  'sudha-murthy'
];

export const optionsList = [
  'Percy Jackson and the Olympians: The Chalice of the Gods',
  'Clear Thinking',
  'Wildfire (Maple Hill Bk 2)',
  'Saturday Stories',
  'Culture: Survival Guide For New Employees'
];

const CategoryTags = () => {


  return (
    <Box
      bg="white"
      p={4}
      mx="auto"
      maxW="100vw"
      boxShadow="md"
      overflowX="auto"
    >
      <Flex wrap="nowrap" align="center" justifyContent="center">
        {categories.map((category, index) => (
          <Menu key={index} closeOnSelect={false} >
            <MenuButton
              as={Button}
              variant="link"
              fontSize="md"
              fontWeight="semibold"
              textDecoration={null}
              mr={6}
            >
              {category.label}
            </MenuButton>
            <MenuList
              minWidth="90vw" 
              minHeight="100vh" 
              overflow="hidden" 
              borderRadius="none" 
              boxShadow="lg"
            >
              <Grid templateColumns="1fr 1fr" gap={4} p={8}>
                <Box>
                  <Text fontWeight="bold" mb={2}>Categories</Text>
                  {categoriesList.map((item, i) => (
                    <MenuItem key={i}>{item}</MenuItem>
                  ))}
                  <Box>
                  <Text fontWeight="bold" mb={2}>Trending</Text>
                  {optionsList.map((item, i) => (
                    <MenuItem key={i}>{item}</MenuItem>
                  ))}
                </Box>
                </Box>
              </Grid>
            </MenuList>
          </Menu>
        ))}
      </Flex>
    </Box>
  );
};

export default CategoryTags;