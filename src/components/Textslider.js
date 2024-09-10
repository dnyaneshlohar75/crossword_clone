"use client";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

const texts = [
  "🚚 Free Shipping on orders above Rs.500",
  " 15% off on Books 📚",
];

function TextSlider() {
  // State to keep track of the current text index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to determine if the text is being hovered over
  const [isHovered, setIsHovered] = useState(false);

  // show the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
  };

  // Function to show the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <Box
      position="relative"
      width="full"
      mx="auto"
    >
      <Box
        position="relative"
        height="30px"
        overflow="hidden"
        bg="#f5f5f5;"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="black"
          textAlign="center"
          p={4}
        >
          {texts[currentIndex]}
        </Text>
      </Box>
      
    </Box>
  );
}

export default TextSlider;
