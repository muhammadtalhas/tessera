import { useState } from "react";
import {
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box, Link as ChakraLink,
    InputRightElement, Grid, GridItem,
    Center, HStack, Spacer, Text, Image, Flex, SimpleGrid, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
} from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';

import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/color-mode";


// icons
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { ViewIcon, ViewOffIcon, CheckIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom'



function LoginBox() {

    const [showPassword, setShowPassword] = useState(false);
    // function for showing/hiding password
    const handleShowClick = () => setShowPassword(!showPassword);
    const navigate = useNavigate();


    // light/dark mode
    const textColor = useColorModeValue('blue.500', 'blue.200')


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [invalid, setInvalid] = useState(false);

    // check the status code in the then. if status code is 400 set the state. and 


    // fetc  to make hrtp requests to the backend. fetches login values
    async function fetchLoginValues() {

        const response = await fetch(`http://localhost:5000/login`, {
            method: 'POST',
            credentials: 'include',  // Include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.status === 200) {
                    navigate('/events')
                } else {
                    setInvalid(true);
                }
            })
            .catch(error => console.error(('Error fetching events:', error)), []);
    }

    return (

        <Card maxW='900px'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            size='lg'
            h='100%'
        >

            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '50%' }}
                src='https://img.freepik.com/premium-photo/concert-scene-blue-light-with-audience-raising-their-hands-air_832479-14289.jpg'
                alt='Concert Blue Party Hands'
            />

            <CardBody align='center' >
                <form>
                    <Box maxW={{ base: "100%", md: "400px" }} justify-content='center' paddingTop='15%'>

                        <Stack spacing={5} p="3rem">
                            <Heading size='2xl' color={textColor}>Login</Heading>
                            {invalid ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle>Try Again</AlertTitle>
                                    <AlertDescription>invalid username/email</AlertDescription>
                                </Alert> : null}
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        children={<CFaUserAlt color={textColor} />}
                                    />
                                    <Input type="text" placeholder="username or email address" onChange={(e) => setUsername(e.target.value)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <InputLeftElement
                                        children={<CFaLock color={textColor} />}
                                    />
                                    <Input type={showPassword ? "text" : "password"} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                                    <InputRightElement width="4.5rem" >
                                        <Button h="1.5rem" size="sm" color={textColor} onClick={handleShowClick}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <HStack pt='1'>
                                    <FormHelperText align-items='end'>
                                        <ChakraLink as={Link} to='/signup'>Sign up</ChakraLink>
                                    </FormHelperText>
                                    <Spacer />
                                    <FormHelperText>
                                        <Link>forgot password?</Link>
                                    </FormHelperText>
                                </HStack>
                            </FormControl>
                            <Button
                                colorScheme="blue"
                                onClick={fetchLoginValues}
                            >
                                Sign in
                            </Button>

                        </Stack>
                        <Spacer />
                        <ChakraLink as={Link} to='/events' color={textColor}><ArrowBackIcon/> Browse Events</ChakraLink>
                        
                    </Box>
                </form>
            </CardBody>


        </Card>


        // <Box
        //         maxWidth='100%'
        //         maxHeight='100%'
        //         opacity='.5'
        //     >

        //         <HStack spacing = '0'>
        //             <Box
        //                 bg='pink'
        //                 height='100vh'
        //                 width='50%'
        //             >

        //                 image here
        //             </Box>
        //             <Box 
        //                 bg='gray'
        //                 height='100vh'
        //                 width='50%'
        //             >
        //                 login here
        //             </Box>
        //         </HStack>

        //  </Box>

    );
}

export default LoginBox;