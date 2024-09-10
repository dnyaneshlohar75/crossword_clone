import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Arrow = ({ onClick, direction }) => (
  <IconButton
    aria-label={`Arrow ${direction}`}
    icon={direction === 'prev' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    onClick={onClick}
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    zIndex="2"
    borderRadius="full"
    bg="white"
    boxShadow="md"
    _hover={{ bg: 'gray.200' }}
    _active={{ bg: 'gray.300' }}
    size="lg"
    variant="outline"
    right={direction === 'prev' ? '10px' : 'auto'}
    left={direction === 'next' ? '10px' : 'auto'}
  />
);

export default Arrow;
