import React from "react";

// Chakra imports
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/NftBanner1.png";

export default function Banner(props) {
  // Chakra Color Mode
  const {videos, videoName } = props;
    return (
      <Box
      bgSize='cover'
      borderRadius='30px'
      position='relative'
      pb={{ base: "56.25%", md: "30px", lg: "56.25%" }}
    >
      <iframe
        src="https://www.youtube.com/embed/qz0aGYrrlhU"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '30px' }}
      ></iframe>
    </Box>
    
    
  );
}
