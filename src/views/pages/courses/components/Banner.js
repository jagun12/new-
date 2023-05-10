import React from "react";

// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/NftBanner1.png";

export default function Banner(props) {
  // Chakra Color Mode
  const {image , title , courseList } = props;
  return (
    
    <Flex
      direction='column'
      bgImage={
        image
      }
      bgSize='cover'
      py={{ base: "30px", md: "166px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius='30px'>
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color='white'
        mb='14px'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight='700'
        lineHeight={{ base: "32px", md: "42px" }}>
       
      </Text>
    
    </Flex>
    
  );
}
