import React, { useEffect, useState } from 'react';
import TesseraSeatPicker from 'tessera-seat-picker';
import { Grid, GridItem, Box, Button, Flex, Card, VStack, HStack, useToast, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription } from '@chakra-ui/react';
import '../../style.css'

function SeatPicker({ event_id, user_id, callback_function, onSoldOutChange }) {
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [rows, setRows] = useState([]);
    let add = true;
    const [soldOut, setSoldOut] = useState(false);
    const toast = useToast();
    const toastId = 'soldOutToast'
    // fetch the tickets (seats) when the event_id changes
    useEffect(() => {
        fetch(`http://localhost:5000/inventory/tickets/event/${event_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setTickets(data); // update the use state with the fetched tickets

                // check if all the seats are sold out or not
                const availableSeats = data.filter(ticket => ticket.status == 'AVAILABLE');
                setSoldOut(availableSeats.length == 0)
                if (availableSeats.length == 0) {
                    if (!toast.isActive(toastId)) {
                        toast({
                            toastId,
                            position: 'top-left',
                            title: 'Sold Out',
                            description: "All seats have been booked for this event",
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        })
                    }

                }

            }).catch(error => console.error('Error fetching:', error));
    }, [event_id]); // dependency is event_id so this useeffect runs when the event_id changes

    // make the tickets (seats) data into the correct format when the tickets are fetched
    useEffect(() => {
        // using a reducer. first param is what is accumulating the value and second param is the initial value
        if (tickets.length > 0) {
            const result = tickets.reduce((acc, c) => {
                const seat_info = {
                    id: c.row_name.concat(c.seat_number), // this is the unique id for the seat
                    number: c.seat_number,
                    isReserved: (c.status == "AVAILABLE") ? false : true,
                    tooltip: "$".concat(c.value),
                }

                // accumulating the seats into rows
                if (!(c.row_name in acc)) {
                    acc[c.row_name] = [seat_info]
                }
                else {
                    acc[c.row_name].push(seat_info)
                }

                return acc;
                // return [...a, {rowName: c.row_name.charCodeAt()-64, seatNum: c.seat_number}];

            }, {}); // type object as the initial value 
            setRows(Object.values(result)) // update the state with the rows data ignoring the keys
            setLoading(false)

            const availableSeats = tickets.filter(ticket => ticket.status == 'AVAILABLE');
            const isSoldOut = availableSeats.length == 0;
            // onSoldOutChange(isSoldOut);
        }
    }, [tickets]); // dependency- runs when tickets chance

    // id is seat id
    const addSeatCallback = async ({ row, number, id }, addCb) => {
        setLoading(true);


        // const price = await fetchSeatPrice(row, number, event_id);
        // Your custom logic to reserve the seat goes here:
        fetch(`http://localhost:5000/inventory/reserve/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                row,
                number,
                event_id
            })

        }).then(x => {
            callback_function(row, number, add)
            // Assuming everything went well...
            setSelected((prevItems) => [...prevItems, id]);

            const updateTooltipValue = 'Added to cart';

            // Important to call this function if the seat was successfully selected - it helps update the screen
            addCb(row, number, id, updateTooltipValue);
            setLoading(false);
        });
    };

    const removeSeatCallback = async ({ row, number, id }, removeCb) => {
        setLoading(true);
        add = false;


        // Your custom logic to remove the seat goes here...
        fetch(`http://localhost:5000/inventory/unreserve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                row,
                number,
                event_id
            })
        }).then(x => {
            setSelected((list) => list.filter((item) => item !== id));
            callback_function(row, number, add)
            removeCb(row, number);
            setLoading(false);
        })

    };


    return (
        <Box position='relative'>
            {
                soldOut && (
                    <>
                        <Alert
                            status='error'
                            zIndex='1'
                            variant='subtle'
                        >
                            <AlertIcon />
                            <AlertTitle>
                                Sold out!
                            </AlertTitle>
                            <AlertDescription>
                                All seats have been booked for this event.
                            </AlertDescription>
                        </Alert>
                    </>
                )
            }
            <Box zIndex='1'>
                <TesseraSeatPicker
                    addSeatCallback={addSeatCallback}
                    removeSeatCallback={removeSeatCallback}
                    rows={rows}
                    maxReservableSeats={6}
                    alpha
                    visible
                    loading={loading}
                    seatStyle={{ backgroundColor: 'lightgreen', borderRadius: '5px' }}
                    stageStyle={{ backgroundColor: 'DarkGray', height: '40px' }}
                    containerClassName="custom-container"
                    stageClassName="custom-stage"
                />
            </Box>
        </Box>
    );
}


export default SeatPicker;