import React from 'react';
import {
  Container, Box
} from '@chakra-ui/react';
import ImageSlider from '@/components/Imageslider';
import TextSlider from '@/components/Textslider';
import SudhaMurthy from '@/components/sudhamurthy';
import Footer from '@/components/Footer';

const Dashboard = () => {
  return (
    <>
    
     <TextSlider/>
     <ImageSlider/>  
     <SudhaMurthy/>
     <Box>
       <Footer/>
     </Box>
     
    </>
  );
};

export default Dashboard;
