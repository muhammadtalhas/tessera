import { useState, useEffect, useRef } from "react";
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';

import {
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    FormControl,
    FormHelperText,
    InputRightElement, Grid, GridItem,
    Center, HStack, Spacer, Text, Image, Flex, SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'





function ChangePassword(user_id) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [invalid, setInvalid] = useState(false);
    const [new_password, setNewPassword] = useState('');
    const [curr_password, setCurrPassword] = useState('');
    const navigate = useNavigate();

    async function fetchChangePass() {
        const response = await fetch(`http://localhost:5000/users/change_password/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            //credentials: 'include',  // Include cookies in the request
            body: JSON.stringify({
                new_password: new_password,
                curr_password: curr_password
            })


        })
            .then(response => {
                if (response.status == 200) {
                    navigate('/account')
                } else {
                    setInvalid(true);
                }
            })
            .catch(error => console.error(('Error fetching events:', error)), []);
    }

    return (
        <>
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

                        <FormControl mt={4}>
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input placeholder='Enter your new password again' />
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
        </>

    )
}

export default ChangePassword;