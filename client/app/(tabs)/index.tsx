import { Text, View, StyleSheet, FlatList, Button, KeyboardAvoidingView, Platform } from "react-native";
import { Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import { Event }  from "@/app/types/Event";
import EventCard from "@/components/EventCard";

export default function Index() {  
  
  // USE STATE HOOKS
  const [events, setEvents] = useState<Event[]>([]); // This will hold JSON data from the server
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  // INITIAL MOUNT: 
  useEffect( () => {
    getEvents();
  }, [] );

  // GET EVENTS
  async function getEvents() {
    try {
      const response = await fetch("/api/getHandler");
      const eventData = await response.json();
      setEvents(eventData);
      setFilteredEvents(eventData);
    } catch (error) {
      console.error(error, "Error in file: index.tsx (getEvents)");
    }
  };

  // SEARCH QUERY EFFECT
  useEffect( () => {
    //console.log("Search Query: ", searchQuery);
    const filtered = events.filter( (e) => {
      return (
        (e.event && e.event.toLowerCase()
        .includes(searchQuery.toLowerCase())) ||
        (e.venue && e.venue.toLowerCase()
        .includes(searchQuery.toLowerCase())) ||
        (e.date && e.date.original_date.toLowerCase()
        .includes(searchQuery.toLowerCase()))
      );
    });
    setFilteredEvents(filtered);
    // When the dependency variable changes, this effect is run
    // In this case, searchQuery and events are both dependency arrays
    // If they are changed, the effect is run
  }, [searchQuery, events] );

  // SEARCH
  function onChangeSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    > 
      <Searchbar
        placeholder="Stay classy..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ width: "95%",
          backgroundColor: "#fff",
          margin: 10,
         }}
      />

      <FlatList
        data={searchQuery ? filteredEvents : events}
        renderItem={({ item }) => (
          <EventCard
            style={styles.cardContainer}
            city={item.city}
            date={item.date}
            event={item.event}
            venue={item.venue}
            website={item.website}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101010",
  },
  text: {
    color: '#fff',
  },
  textLarge: {
    color: '#fff',
    fontSize: 40,
  },
  cardContainer: {
    backgroundColor: "#25292e",
    padding: 20,
    borderRadius: 10,
    height: 200,
  },
  listContent: {
    paddingBottom: 20,
  },
});


/*
<EventCard
  event="An Evening of Jazz - Jazz Faculty Recital"
  venue="Jazz Showcase, Chicago"
  date="Friday, February 21, 2025"
/>
<EventCard
  //style={styles.cardContainer}
  event="Date 2!"
  venue="Crazy Jazz Event!"
  date="Date 2, 2025"
/>
<EventCard
  //style={styles.cardContainer}
  event="Unbelievable Jazz Bands!"
  venue="Unbelievable Jazz Bands!"
  date="Date 3, 2025"
/>

*/