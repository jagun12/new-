// Chakra imports
import { Button, Circle, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import SwitchField from "components/fields/SwitchField";
import Menu from "components/menu/MainMenu";
import { IoIosArrowForward } from "react-icons/io";

export default function Notifications(props) {
  const {title , sectionName , id , index } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb="px" mt="px" mx="auto" maxW="410px">
      <Flex align="center" w="100%" justify="space-between" mb="10px">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="px"
        >
          Topics 
        </Text>
      
      </Flex>
       <Text color={textColorPrimary} fontSize="md" me="16px" mb="5px">
          {sectionName}
      </Text>
    

     
      <Flex align="center" w="100%" justify="space-between" mb="10px" gap='20px'>
      <Button size='sm' variant='outline' mt='4px'>
      {index}
  </Button>

  <Text
    style={{ color: '#707EAE', fontWeight: 'bold', wordWrap: 'break-word' , cursor: 'pointer' }}
    fontSize="md"
    mx="auto"
  >
    {title}
  </Text>

  <Button size='sm' variant='outline' mt='4px'>
    <Icon as={IoIosArrowForward} />
  </Button>
</Flex>
      

       


      {/* <Flex align="center" w="100%" justify="space-between" mb="10px">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="px"
        >
        What you’ll learn 
        </Text>
      
      </Flex>
       <Text color={textColorPrimary} fontSize="md" me="16px" mb="5px">
       You’ll learn to have a powerful Instagram account setup for your Business or personal that you can build your brand and convert your followers into paying customers, how to attract 20,000 real followers to your account and how to convert your new Instagram followers to long-term loyal paying customers who love your business!
      </Text> */}



    </Card>
  );
}
