import React, { useEffect, useState } from 'react';
import { SimpleGrid, Container} from '@chakra-ui/react';
import EventCard from '../components/EventCard';
import Filter from '../components/Filter';

function EventsPage() {
  const [events, setEvents] = useState([]);

  // Filtering
  const today = new Date();
  today.setDate(today.getDate());
  const [date, setDateFromChild] = useState("");
  const [name, setNameFromChild] = useState("");
  const[location, setLocationFromChild ] = useState("");

  function handleDataFromChild(date, name, location) {
    setDateFromChild(date);
    setNameFromChild(name);
    setLocationFromChild(location);
  }

  useEffect(() => {
    fetch(`http://localhost:5000/events?date=${date}&name=${name}&location=${location}`)
      .then(response => response.json())
      .then(setEvents)
      .catch(error => console.error('Error fetching events:', error));
  }, [date, name, location]);
  
  return (
    <Container maxW='container.lg' centerContent paddingTop = '4'>
      <Filter sendDataToParent={handleDataFromChild}/>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} py={5}>
        {events.map(event => (
          <EventCard
            key={event.event_id}
            id={event.event_id}
            name={event.name}
            date={event.date}
            location={event.location}
            imageUrl={event.image_url} 
            time={event.time}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default EventsPage;