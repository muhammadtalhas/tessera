import { useState, useRef } from "react";
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
    Center, VStack, HStack, Spacer, Text, Image, Flex, SimpleGrid, Wrap, WrapItem, Avatar, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, Card, CardHeader, CardBody, CardFooter, Divider, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';

import { useColorModeValue } from "@chakra-ui/color-mode";

import ChangePassword from '../components/ChangePassword';
import { GrUpdate } from "react-icons/gr";
import { FaUserAlt, FaLock } from "react-icons/fa";

// icons
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

import { ViewIcon, EditIcon, ArrowBackIcon } from '@chakra-ui/icons';


const UpdateUserBox = ({ user_id, username, email, firstName, lastName, avatarUrl }) => {
    const [invalid, setInvalid] = useState(false);
    const [new_username, setNewUsername] = useState('');
    const [new_email, setNewEmail] = useState('');
    const [new_avatar_url, setNewAvatarUrl] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const [confirmPassword, setConfirmPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [curr_password, setCurrPassword] = useState('');
    const passwordsMatch = new_password === confirmPassword;

    const textColor = useColorModeValue('blue.500', 'blue.200')

    async function fetchUpdateUser() {
        const response = await fetch(`http://localhost:5000/users/update/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            //credentials: 'include',  // Include cookies in the request
            body: JSON.stringify({
                new_username: new_username,
                new_email: new_email,
                new_avatar_url: new_avatar_url
            })

        })
            .then(response => {
                if (response.status == 200) {
                    toast({
                        title: 'Changed Information Successfully',
                        description: '',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });

                    setTimeout(() => {
                        navigate('/account')
                    }, 2000);
                } else {
                    setInvalid(true);
                }
            })
            .catch(error => console.error(('Error fetching events:', error)), []);
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    

    async function fetchChangePass() {
        if (!passwordsMatch) {
            return; // return if the new password doesn't match confirm password
        }
        
        const response = await fetch(`http://localhost:5000/users/change_password/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include',  // Include cookies in the request
            body: JSON.stringify({
                new_password: new_password,
                curr_password: curr_password
            })


        })
            .then(response => {
                if (response.status == 200) {
                    toast({
                        title: 'Changed Password Successfully',
                        description: 'Rerouting to login page',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });

                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                } else {
                    setInvalid(true);
                }
            })
            .catch(error => console.error(('Error fetching events:', error)), []);
    }

    return (
        <Card
            size='lg'
            height='100%'
            maxWidth='100vw'

            marginTop='80px'

        >
            <CardBody>


                <HStack p='15px'>
                    <Wrap>
                        <WrapItem>
                            <Avatar borderWidth='1px' borderColor='black' size='2xl' src={`${avatarUrl}`} />
                        </WrapItem>
                    </Wrap>


                    <VStack paddingStart='25px' alignItems='left'>
                        <Heading> {firstName} {lastName}</Heading>

                        <Text as='u'>
                            <ChakraLink as={Link} to={`/account`}><ArrowBackIcon />Back to account info </ChakraLink>
                        </Text>


                    </VStack>

                </HStack>




                <Heading as='h2' size='md' paddingStart='5px' paddingTop='15px'>Update Info</Heading>

                <TableContainer paddingTop='15px'>
                    <Table variant='striped' colorScheme='gray' size='lg'>
                        <Tbody>
                            <Tr>
                                <Td>Username</Td>
                                <Td>
                                    <FormControl>
                                        <Input type="text" placeholder={username} onChange={(e) => setNewUsername(e.target.value)} />
                                    </FormControl>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Email</Td>
                                <Td>
                                    <FormControl>
                                        <InputGroup>
                                            <Input type="text" placeholder={email} onChange={(e) => setNewEmail(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Avatar URL</Td>
                                <Td>
                                    <FormControl>
                                        <InputGroup>
                                            <Input type="text" placeholder={avatarUrl} onChange={(e) => setNewAvatarUrl(e.target.value)} />
                                        </InputGroup>
                                    </FormControl>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>Change Password</Td>
                                <Td>



                                    <Button onClick={onOpen}><EditIcon /></Button>

                                    <Modal
                                        initialFocusRef={initialRef}
                                        finalFocusRef={finalRef}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                    >
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Change your password</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody pb={6}>
                                                <FormControl>
                                                    <FormLabel>Current Password</FormLabel>
                                                    <Input ref={initialRef} placeholder='Enter your current password' onChange={(e) => setCurrPassword(e.target.value)} />
                                                </FormControl>

                                                <FormControl mt={4}>
                                                    <FormLabel>New Password</FormLabel>
                                                    <Input placeholder='Enter your new password' onChange={(e) => setNewPassword(e.target.value)} />
                                                </FormControl>

                                                <FormControl mt={4} isInvalid={!passwordsMatch}>
                                                    <FormLabel>Confirm New Password</FormLabel>
                                                    <Input placeholder='Enter your new password again' onChange={(e) => setConfirmPassword(e.target.value)}/>
                                                    {
                                                        !passwordsMatch && (<FormErrorMessage>Passwords do not match. Try again.</FormErrorMessage>)
                                                    }
                                                </FormControl>
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={fetchChangePass}>
                                                    Change
                                                </Button>
                                                <Button onClick={onClose}>Cancel</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Td>
                            </Tr>
                        </Tbody>

                    </Table>
                </TableContainer>

                <Flex padding='20px' justifyContent='right'>
                    <Button
                        rightIcon={<GrUpdate />}
                        colorScheme='gray'
                        
                        onClick={fetchUpdateUser}
                    >
                        Update
                    </Button>
                </Flex>


            </CardBody>
        </Card>

    )
}

export default UpdateUserBox;