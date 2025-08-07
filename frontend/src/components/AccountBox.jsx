import { useState, useEffect } from "react";
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
    TableContainer, Card, CardHeader, CardBody, CardFooter, Divider
} from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock, FaSignOutAlt } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/color-mode";
// icons
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { EditIcon } from '@chakra-ui/icons';
import TicketsBoughtTable from './TicketsBoughtTable';


const AccountBox = ({ userId, firstName, lastName, email, avatarUrl, username }) => {
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);

    async function fetchLogout() {
        const response = await fetch(`http://localhost:5000/logout`, {
            method: 'POST',
            credentials: 'include',  // Include cookies in the request

        })
            .then(response => {
                if (response.status == 200) {
                    navigate('/login')
                } else {
                    setInvalid(true);
                }
            })
            .catch(error => console.error(('Error fetching events:', error)), []);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/inventory/display/${userId}`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(setTickets)

            .catch(error => console.error('Error fetching:', error));
    }, []);

    return (
        <Box>
        <Card
            size='lg'
            height='auto'
            maxWidth='100vw'
        >
            <CardBody overflowY='auto'>
                <HStack p='15px'>
                    <Wrap>
                        <WrapItem>

                            <Avatar borderWidth='1px' borderColor='black' size='2xl' src={`${avatarUrl}`} />

                        </WrapItem>
                    </Wrap>

                    <VStack paddingStart='25px' alignItems='left'>
                        <Heading> {firstName} {lastName}</Heading>
                        <Text>{email}</Text>
                        <Text as='u'>
                            <ChakraLink as={Link} to={`/update_user`}>Edit Your Information <EditIcon /></ChakraLink>
                        </Text>

                    </VStack>
                </HStack>

                <Heading as='h2' size='md' paddingStart='5px' paddingTop='15px'>Account</Heading>

                <TableContainer paddingTop='15px' maxHeight='300px' overflowY='auto' border='solid'>
                    <Table variant='striped' colorScheme='gray' size='lg'>
                        <Tbody>
                            <Tr>
                                <Td>Username</Td>
                                <Td>{username}</Td>
                            </Tr>
                            <Tr>
                                <Td>Email</Td>
                                <Td>{email}</Td>
                            </Tr>
                            <Tr>
                                <Td>Full Name</Td>
                                <Td>{firstName} {lastName}</Td>
                            </Tr>
                        </Tbody>

                    </Table>
                </TableContainer>

                <Heading as='h2' size='md' paddingStart='5px' paddingTop='20px'>Tickets Bought</Heading>

                <TableContainer paddingTop='15px' maxHeight='210px' overflowY='auto'>
                    <Table variant='striped' colorScheme='gray' size='lg'>
                        <Thead>
                            <Tr>
                                <Th>Event</Th>
                                <Th>Event Date</Th>
                                <Th>Seat</Th>
                                <Th>Purchase Date</Th>
                            </Tr>
                        </Thead>
                        {tickets.map(ticket => (
                            <TicketsBoughtTable
                                key={ticket.event_id + ticket.row_name + ticket.seat_number}
                                eventId={ticket.event_id}
                                rowName={ticket.row_name}
                                seatNumber={ticket.seat_number}
                                purchaseDate={ticket.purchase_date}
                            />
                        ))}

                    </Table>
                </TableContainer>

                <Flex padding='20px' justifyContent='right'>
                    <Button
                        rightIcon={<FaSignOutAlt />}
                        colorScheme='blue'
                        variant='outline'
                        onClick={fetchLogout}
                    >
                        Logout
                    </Button>
                </Flex>


            </CardBody>
        </Card>
        </Box>
    )
}

export default AccountBox;