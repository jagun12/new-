import React from "react";

// Chakra imports
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex ml='7'   direction='column'>
      {/* <Image width='60%'   src='http://localhost:3002/static/media/logo.7dd1271ef7b725000ec8.jpg' alt='Logo' /> */}
     
    </Flex>
  );
}

export default SidebarBrand;
