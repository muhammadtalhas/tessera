import React, { useEffect, useState } from 'react';
import { Box, Image, Text, VStack, Heading, LinkBox, Button, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function EventCard({ id, name, date, location, imageUrl, time }) {
  const [timeLeft, setTimeLeft] = useState('');
  const navigate = useNavigate();
  const toast = useToast()


  function redirect() {

    try {
      fetch(`http://localhost:5000/users/account_info`, { credentials: 'include' })
        .then(response => {
          if (response.status == 200) {
            navigate(`/events/${id}`)
          }
          else {
            setTimeout(() => {
              navigate('/login')
            }, 4000);
            toast({
              title: 'Login to view event details',
              description: 'Redirecting you to login page',
              status: 'error',
              duration: 4000,
              isClosable: true
            })
          }
        })
    } catch (error) {
      console.error('Error redirecting: ', error);
    }
    // .catch(error => console.error('Error fetching User:', error));
  }


  useEffect(() => {
    const updateTimer = () => {
      const eventDate = new Date(date);

      const dateTimeString = `${date}T${time}`;
      const dateTime = new Date(dateTimeString);
      const now = new Date().getTime();
      const distance = dateTime - now;

      if (distance == 0) {
        setTimeLeft('Event has started');
        return;
      } else if (distance < 0) {
        setTimeLeft('Event has ended');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the timer text
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    // Update the timer every second
    const timerId = setInterval(updateTimer, 1000);

    // Cleanup the interval on component unmount
    // the date technically only changes once
    return () => clearInterval(timerId);
  }, [date, time]);

  return (
    <LinkBox as="article" w="full" borderWidth="1px" rounded="md" overflow="hidden" boxShadow="md">
      <VStack align="stretch">
        {imageUrl && (
          <Image borderRadius="md" src={imageUrl} alt={`Image for ${name}`} objectFit="cover" width="full" boxSize='300px' />
        )}
        <VStack align="stretch" p="4">
          <Heading size="md" my="2">{name}</Heading>
          <Text fontSize="sm">Date: {date}</Text>
          <Text fontSize="sm">Location: {location}</Text>
          <Text fontSize="sm" color="red.500">{timeLeft}</Text>
          <Button colorScheme="blue" mt="4" onClick={redirect}>
            Buy Tickets!
          </Button>
        </VStack>
      </VStack>
    </LinkBox>
  );
}

export default EventCard;