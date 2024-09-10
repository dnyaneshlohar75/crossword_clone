import React from 'react';
import {
  Container, Box
} from '@chakra-ui/react';
import Header from '@/components/header';
import HeaderSection from '@/components/HeaderSection';
import ImageSlider from '@/components/Imageslider';
import TextSlider from '@/components/Textslider';
import CategoryTags from '@/components/Categorytags';
import SudhaMurthy from '@/components/sudhamurthy';
import Footer from '@/components/Footer';

const Dashboard = () => {
  return (
    <Container p={0} maxW="100%" m={0}>
     <Header /> 
     <HeaderSection />
     <CategoryTags/>
     <TextSlider/>
     <ImageSlider/>  
     <SudhaMurthy/>
     <Box>
       <Footer/>
     </Box>
    </Container>
  );
};

export default Dashboard;
