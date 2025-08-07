import { useState, useEffect } from "react";
import {
    Tr,
    Tbody,
    Td
} from '@chakra-ui/react'
function TicketsBoughtTable({ eventId, rowName, seatNumber, purchaseDate }) {
    const [event, setEvent] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/events/${eventId}`, { credentials: 'include' })
            .then(response => response.json())
            .then(event => setEvent(event[0]))
            .catch(error => console.error('Error fetching events', error));
    }, []);

    return (
        <Tbody>
            <Tr>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{rowName}{seatNumber}</Td>
                <Td>{purchaseDate}</Td>
            </Tr>
        </Tbody>
    );
}

export default TicketsBoughtTable;