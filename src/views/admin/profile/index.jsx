
import { Box, Button, FormControl, FormLabel, Grid, Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Avatar,  Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState } from "react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import { useAuth } from "contexts/AuthContext";
import { getAuth, updatePassword, updateEmail  , updateProfile } from 'firebase/auth';
import {db } from 'firebase.js'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
export default function Overview() {

  const { user } = useAuth();

  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = React.useState(false);
  let email = user.email;

  let name = user.displayName

  const handleClick = () => setShow(!show);


  

  let password = localStorage.getItem('password')
  

   // take current name and update it with new name
    const handleNewName = async () => {
    try {
       await updateProfile(user, {displayName: newName});
      alert('Name updated successfully');
    } catch (error) {
      alert(error.message);
    }
  };


 
  const handlePasswordChange = async () => {
    try {
      await updatePassword(user, newPassword);
      alert('Password updated successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    
      <Flex mb='24px' alignItems='center' justifyContent='space-between'>
      <FormControl>
      <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
           
              mb='8px'>
              Current UserName<Text  color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='text'
              value={name}
               
              disabled
              mb='24px'
              fontWeight='500'
              size='lg'
             
            />
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
           
              mb='8px'>
              Current Email<Text  color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={email}
               
              disabled
            />
             <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                value={password}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          
          </Flex>
          <Text fontSize='lg' mb="10" fontWeight='500' color={textColor}>
              Update Your Profile 
            </Text>
          <Flex mb='24px' alignItems='center' justifyContent='space-between'>
            
      <FormControl>
      <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
           
              mb='8px'>
              Update  UserName<Text  color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='text'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
             
              mb='24px'
              fontWeight='500'
              size='lg'
             
            />
          
             <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              
              display='flex'>
             Update Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Box style={{
              display: 'flex',
              justifyContent: 'space-between',
              
            }} mt={4}>
            <Button onClick={ handleNewName}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='10%'
              h='50'
    
              mb='24px'>
              Update Name
            </Button>
            <Button onClick={ handlePasswordChange}

              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='10%'
              h='50'
              
              mb='24px'>
              Update Password
            </Button>
            </Box>
          </FormControl>
          
          </Flex>
            
   
    </Box>
  );
}
