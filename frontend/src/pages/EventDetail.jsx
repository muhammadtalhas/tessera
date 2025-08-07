// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import EventIdCard from '../components/EventIdCard';

function EventDetail() {
  const { id } = useParams(); 
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`, {credentials:'include'})
      .then(response => response.json())
      .then(setEvents)

      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    
    <Grid>
      {events.map(event => (
        <EventIdCard
          key={event.event_id}
          id={event.event_id}
          name={event.name}
          date={event.date}
          description={event.description}
          location={event.location}
          imageUrl={event.image_url} 
          time={event.time}
        />
      ))}
    </Grid>
  );
}

export default EventDetail;