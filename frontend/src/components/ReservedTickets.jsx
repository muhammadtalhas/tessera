import { Text, Flex, Box, HStack } from '@chakra-ui/react'
function ReservedTickets({ reservedTickets }) {

    return (
        <Flex>
            <Text mr='1'>Selected Seats:</Text>
            {reservedTickets.map((seat, index) => (
                <Box key={index} >
                    <HStack>
                        <Text mr='1'>{seat.row}{seat.number}{index < reservedTickets.length - 1 && `, `}</Text>
                    </HStack>
                </Box>
            ))}
        </Flex>
    );
};

export default ReservedTickets;