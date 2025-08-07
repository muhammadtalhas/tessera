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
    Center, HStack, Spacer, Text, Image, Flex, SimpleGrid,
    WrapItem
} from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/color-mode";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

// icons
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Avatar, AvatarBadge, AvatarGroup, Wrap } from '@chakra-ui/react'


function SignupBox() {

    const [showPassword, setShowPassword] = useState(false);
    // function for showing/hiding password
    const handleShowClick = () => setShowPassword(!showPassword);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar_url, setAvatarUrl] = useState('');
    const [invalid, setInvalid] = useState(false);

    const navigate = useNavigate();


    // light/dark mode
    const textColor = useColorModeValue('blue.500', 'blue.200')

    // fetch  to make hrtp requests to the backend. fetches signup values
    async function fetchSignupValues() {
        const response = await fetch(`http://localhost:5000/users/create`, {
            method: 'POST',
            //credentials: 'include',  // Include cookies in the request
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name, last_name, username, email, password, avatar_url })
        })
            .then(response => {
                if (response.status === 201) {
                    navigate('/login')
                } else {
                    setInvalid(true);
                }
            })
            .catch(error => console.error(('Error fetching events:', error)), []);
    }

    return (
        
        
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            size='lg'
            height='100%'
            maxWidth='100vw'


        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '50%' }}
                src='https://img.freepik.com/premium-photo/crowd-concert-with-spotlight-background_852169-789.jpg'
                alt='Concert Blue Show'
            />

            <CardBody align='center'>
                <form>
                    <Box maxW={{ base: "100%", md: "400px" }} justify-content='center' paddingTop='15%'>

                        <Stack spacing={5} p="3rem">
                        
                            <Center>
                                <Wrap>
                                    <WrapItem>
                                    <Avatar src={avatar_url} />
                                    </WrapItem>
                                </Wrap>
                            </Center>

                            {invalid ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle>Try Again</AlertTitle>
                                    <AlertDescription>invalid</AlertDescription>
                                </Alert> : null}

                            <HStack>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(e) => setFirstName(e.target.value)}

                                    />

                                </FormControl>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </FormControl>
                            </HStack>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Avatar Url"
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                    <InputRightElement width="4.5rem" >
                                        <Button h="1.5rem" size="sm" color={textColor} onClick={handleShowClick}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <HStack pt='1'>
                                    <FormHelperText align-items='end'> <span>Already have an account? </span>
                                        <ChakraLink as={Link} to='/login'>Login here</ChakraLink>
                                    </FormHelperText>
                                </HStack>
                            </FormControl>
                            <Button
                                colorScheme="blue"
                                onClick={fetchSignupValues}
                            >
                                Sign up
                            </Button>
                        </Stack>
                    </Box>
                </form>
            </CardBody>


        </Card>




    );
}

export default SignupBox;