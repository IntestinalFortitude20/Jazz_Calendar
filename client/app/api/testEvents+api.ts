

export function GET(request: Request) {
    const data = [
      { id: 1, event: "An Evening of Jazz - Jazz Faculty Recital", venue: "Jazz Showcase, Chicago", date: "Friday, February 21, 2025" },
      { id: 2, event: "Crazy Jazz Event!", venue: "Crazy Jazz Venue, your city!", date: "March 2, 2025" },
      { id: 3, event: "MVCC Jazz Ensemble", venue: "Velvet Lounge, Chicago!", date: "March 7, 2025" },
      { id: 4, event: "Rajiv Orozco Quartet", venue: "Velvet Lounge, Chicago!", date: "March 10, 2025" },
      { id: 5, event: "Brass Tracks Orchestra", venue: "Velvet Lounge, Chicago!", date: "March 12, 2025" },
      { id: 6, event: "Dropkick Murpheys", venue: "Velvet Lounge, Chicago!", date: "March 15, 2025" },
      { id: 7, event: "Paul Abella Trio", venue: "Imperial Oak, Willow Springs", date: "March 17, 2025" },
    ];  
    
    return Response.json(data);
    //return Response.json({ hello: 'world' });
    }


// I CUT THIS FUNCTION FROM THE INDEX FILE
      // async function testFunction() {
      //   try {
      //     const response = await fetch("/api/testEvents");
      //     const eventData = await response.json();
      //     setEvents(eventData);
      //     console.log(eventData[0]);      
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };