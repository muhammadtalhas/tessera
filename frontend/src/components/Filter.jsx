import { React, useState } from "react";
import {Input, Button, ButtonGroup, Box, Text, Heading, InputGroup, InputLeftElement, Flex, Stack, HStack, VStack} from '@chakra-ui/react'
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Search2Icon } from '@chakra-ui/icons'

function Filter({ sendDataToParent }) {
    const textColor = useColorModeValue('gray.600', 'white')
    const barColor = useColorModeValue('gray.100', 'blue.800')
    const barColor2 = useColorModeValue('gray.300', 'blue.600')
    const linesColor = useColorModeValue('gray.600', 'blue.100')

    const [date, setDate] = useState("");
    const [name, setNameFilter] = useState("");
    const [location, setLocationFilter] = useState("");

    function handleClick() {
        sendDataToParent(date, name, location);
    }

    function clearAllFilters() {
        sendDataToParent('', '', '');
        setDate('');
        setNameFilter('');
        setLocationFilter('');
    }

    return (
        <Flex marginTop='80px' bg={barColor} color={textColor} rounded='md' border='solid' borderColor='blue.800' width='100%' minWidth='max-content' alignItems='start' p='2px' >
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Search2Icon color={textColor} />
                </InputLeftElement>
                <Input rounded='0' borderColor='transparent' type='text' _placeholder={{ color: textColor }} value={location} placeholder='Search by location' onChange={(e) => setLocationFilter(e.target.value)} />
            </InputGroup>

            <Box borderLeft='solid' borderRight='solid' borderLeftColor={linesColor} borderRightColor={linesColor}>
                <ButtonGroup>
                    <Input rounded='0' border='none' size='md' type='date' onChange={(e) => setDate(e.target.value)} />
                </ButtonGroup>
            </Box>

            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Search2Icon color={textColor} />
                </InputLeftElement>
                <Input rounded='0' _placeholder={{ color: textColor }} borderColor='transparent' type='text' placeholder='Search by Event' onChange={(e) => setNameFilter(e.target.value)} />
            </InputGroup>

            <Box paddingLeft='5px' >
                <Button color={textColor} bg={barColor2} onClick={handleClick}>
                    Filter all
                </Button>
            </Box>
            <Box paddingLeft='3px'>
                <Button color={textColor} bg={barColor2} onClick={clearAllFilters}>
                    Clear
                </Button>
            </Box>
        </Flex>
    );
}
export default Filter;