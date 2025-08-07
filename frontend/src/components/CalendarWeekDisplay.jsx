import React from 'react';
import {Flex, Box, Text} from '@chakra-ui/react';
import { useColorModeValue } from "@chakra-ui/color-mode";

// helper function
const parseDate = (date) => {
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day);
}

function CalendarWeekDisplay({ date }) {
    const selectedColor = useColorModeValue('blue.500', 'blue.400');
    const weekColor = useColorModeValue('gray.200', 'blue.700');
    // var formattedDate = date.split(',')[0];
    const date2 = parseDate(date);

    const weekStart = new Date(date2);
    weekStart.setDate(date2.getDate() - date2.getDay());

    // make into 1 week instead of 2 week format
    const days = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + index);
        return day;
    });

    return (
        <Flex minW='40px' borderTop='solid' borderBottom='solid' borderLeft='solid' borderRadius='md' borderWidth='1px'>
            {days.map((day, index) => (
                <Box 
                    key={index}
                    borderRight='solid'
                    borderWidth='1px'
                    w='30px'
                    justifyContent='center'
                    align='center'
                    bg={day.toDateString() == date2.toDateString() ? selectedColor : weekColor}
                >
                    <Text>{day.toLocaleDateString('en-US', { weekday: 'narrow' })}</Text>
                    <Text fontSize='sm'>{day.getDate()}</Text>
                </Box>
            ))}

        </Flex>

    );
}

export default CalendarWeekDisplay;