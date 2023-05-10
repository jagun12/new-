// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";
import Title from  './Title'
// Assets
export default function GeneralInformation(props) {

  const {videoName , index ,  key } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "10px" }} 
      key={key} 
    >
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        {index}
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='16px' mb='5px'>
        {videoName}
      </Text>
    
    
    </Card>
  );
}
