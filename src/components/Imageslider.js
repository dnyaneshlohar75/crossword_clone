"use client";

import { useState, useEffect } from "react";
import { Box, IconButton, Image } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const images = [
  { src: "/images/img.png" },
  { src: "/images/img1.png" },
  { src: "/images/img2.png" },
  { src: "/images/img3.png" },
  { src: "/images/img4.png" },
  { src: "/images/img5.png" },
  { src: "/images/img6.png" },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <Box
      position="relative"
      width="full"
      mx="auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        position="relative"
        width="full"
        height="400px"
        overflow="hidden"
        p={0}
      >
        <Image
          src={images[currentIndex].src}
          alt={`Slider Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          transition="all 0.5s ease-in-out"
        />
        <Box
          position="absolute"
          bottom="10px"
          width="full"
          display="flex"
          justifyContent="center"
        >
          {images.map((_, index) => (
            <Box
              key={index}
              height="10px"
              width="10px"
              mx={2}
              bg={index === currentIndex ? "green.400" : "gray.300"}
              borderRadius="full"
              transition="all 0.5s ease-in-out"
            />
          ))}
        </Box>
      </Box>
      <IconButton
        aria-label="Previous slide"
        icon={<ChevronLeftIcon />}
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        color="black"
        bg="transparent"  
        _hover={{ bg: "transparent" }}  
        border="none" 
        borderRadius="full"
        onClick={prevSlide}
        zIndex={2}
        fontSize="4xl"  
      />
      <IconButton
        aria-label="Next slide"
        icon={<ChevronRightIcon />}
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        color="black"
        bg="transparent"  
        _hover={{ bg: "transparent" }}  
        border="none"  
        borderRadius="full"
        onClick={nextSlide}
        zIndex={2}
        fontSize="4xl"   
      />
    </Box>
  );
}

export default ImageSlider;
