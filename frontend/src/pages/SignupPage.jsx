
import SignupBox from '../components/SignupBox';
import {
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement, Grid, GridItem,
  Center, HStack, Spacer, Text, Image, Flex, SimpleGrid
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";


// route to login in page if 401 error


const SignUpPage = () => {
  

  return (

    <SimpleGrid
      bgGradient='linear(to-r, blue.100, gray.300, gray.400, gray.300, blue.100)'
      padding='59px'
      h='100vh'
      
      alignItems='center'
      justifyContent='center'
    >
      <SignupBox/>
    </SimpleGrid>
  );
};


export default SignUpPage;
