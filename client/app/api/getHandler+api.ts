import Axios from "axios";
import { Event } from "../types/Event";
//use dotenv to hide sensitive information later

//INITIALIZE API CLIENT
const api_client = Axios.create({
    baseURL: "http://127.0.0.1:5050",
});

//INITIALIZE CACHE
//const cache = new NodeCache({ stdTTL: (60 * 60 * 24) }); // 24 hours

//GET HANDLER
export async function GET(request: Request) {
    console.log("Initial GET request received");
  
    const cacheKey = "jazz_events";

    try {
      //CHECK IF DATA IS CACHED
      //const cachedData = cache.get(cacheKey);
      
      //IF CACHED DATA EXISTS, RETURN IT
      // if (cachedData) {
      //   console.log("Returning cached data");
      //   return Response.json(cachedData);
      // }
      
      //IF NO CACHED DATA, FETCH DATA FROM API
      const response = await api_client.get("/events/jazz");
      const data = await response.data;

      //CREATE NEW CACHE ENTRY
      //cache.set(cacheKey, data);

      //RETURN FRESH DATA
      console.log("Returning fresh data");
      return Response.json(data);

    } catch (error) {
        console.error(error, "Error in file: getHandler+api.ts" );
    }
}
    

/*
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
  */