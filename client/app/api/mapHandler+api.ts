import Axios from "axios";
import "dotenv/config";
import * as SQLite from "expo-sqlite";
//import Storage from "expo-sqlite/kv-store";


//const db = SQLite.openDatabaseSync("cache.db");

//CREATE TABLE IF NOT EXISTS
// db.execSync(
//     "CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, value TEXT, ttl INTEGER);"
// );

//INITIALIZE API CLIENT
const api_client = Axios.create({
    baseURL: "http://127.0.0.1:5050",
});

// const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
// const api_client = Axios.create({
//     baseURL: baseUrl,
// });

//MAP HANDLER
export async function GET(request: Request) {
    // DEBUGGING LOG
    console.log("\nmapHandler GET request received (mapHandler+api.ts)");

    //Get the URL from the request
    const requestUri = new URL(request.url, `http://${request.headers.get("host")}`);

    //Extract the venue and city from the URL
    const venue = requestUri.searchParams.get("venue");
    const city = requestUri.searchParams.get("city");

    //If venue or city is missing, return an error
    if (!venue || !city) {
        return new Response(JSON.stringify({ error: "Missing venue or city parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    //console.log("\n\nCalling api...");
    //console.log(`\n\n${venue}, ${city}`);
    try {    
        
        const response = await api_client.get("/map", {
            params: {
                address: `${venue}, ${city}`,
            },
        });
    
        const data = await response.data;
        //console.log(data);
        //console.log("returning to the modal...\n");
        return Response.json(data);
        
    } catch (error) {
        console.error(error, "\nError in file mapHandler");
    };

    // if (response.status !== 200) {
    //     throw new Error(`Google Maps API returned status code: ${response.status}`);
    // }

    // return response;

    //Create a cache key
    // const cacheKey = `${venue.toString().trim()}_${city}`;
    // console.log("\nCache key created:", cacheKey);

    //Check the cache before making an API call
    // console.log("\nTrying this stuff outside the try/catch block...\n");
    // console.log("this is the line before the Storage.getItem() call...\n");
    // //const cachedData = await Storage.getItem(cacheKey);
    // await Storage.setItem("Test Key", JSON.stringify({ Test_Value: "Test Value"}));
    // console.log("\nThis is the line after the Storage.getItem() call...\n");
    //If the data is in the cache, return it

    // const cachedData = await Storage.getItem("Test Key");
    // if (cachedData) {
    //     console.log("\nCache key HIT!");
    // } else {
    //     console.log("\nCache key MISS!");
    // }
    // return;
    // return Response.json(JSON.parse(cachedData));
    try {
        //Because the data is not in cache, make a new request to the API
        

        // Check if the response is valid
        
        
        if (!response.data || !response.data.results || response.data.results.length === 0) {
            throw new Error("Google Maps API returned no results for the given address");
        }


        const googleMapsData = response.data.results[0];

        //Cache the new data
        console.log("\nAttempting to cache new data...");    
        await Storage.setItem(cacheKey, JSON.stringify(googleMapsData));
        // googleMapsData is a JSON object; It needs to be stringified before storing
    
        //Check if the data was cached successfully
        const cachedDataCheck = await Storage.getItem(cacheKey);
        if (cachedDataCheck) {
            console.log("\nCache set successfully!");
        } else {
            console.log("\nFailed to set cache.");
        }
                    
        console.log("Final return statement reached");
        return Response.json(googleMapsData);
        
        
    } catch (error) {
        console.error(error, "\nError in file: mapHandler+api.ts");
    }
};


// if (cachedData) {
        //     console.log("Returning cached data from mapHandler");
        //     const googleMapsData = cachedData;
        //     return Response.json(googleMapsData);
        // }

        //If the data is not cached, make a get request to the API

        
        //DEBUGGING LOGS
        //console.log(googleMapsData.formatted_address);
        //console.log(googleMapsData.navigation_points[0].location.latitude);
        //console.log(googleMapsData.navigation_points[0].location.longitude);

        //Cache the new data
        //Return fresh data from Google Maps
        //console.log("Going back to the modal...")
        //console.log("Returning fresh data from mapHandler");

    //If the response status is not 200, return an error
    // if (response.status !== 200) {
    //     return new Response(JSON.stringify({ error: "Failed to fetch data from Google Maps API" }), {
    //         status: 500,
    //         headers: { "Content-Type": "application/json" },
    //     });
    // }


    //console.log(googleMapsData.results[0].formatted_address);
    //console.log("Google Maps Data: ", googleMapsData);
    // const googleMapsUri = new URL(`${baseUrl}?address=${encodeURIComponent(venue)}`+ "," + 
    //                         `${encodeURIComponent(city)}&key=${api_key}`);                        
    // COME BACK HERE TO FIGURE OUT WHY THE JSON OBJECT WON'T RETURN OR PARSE CORRECTLY
    //console.log(googleMapsUri);                            
        
    // const data = [
    //     { id: 1, event: "An Evening of Jazz - Jazz Faculty Recital", venue: "Jazz Showcase, Chicago", date: "Friday, February 21, 2025" },
    //     { id: 2, event: "Crazy Jazz Event!", venue: "Crazy Jazz Venue, your city!", date: "March 2, 2025" },
    //     { id: 3, event: "MVCC Jazz Ensemble", venue: "Velvet Lounge, Chicago!", date: "March 7, 2025" },
    //     { id: 4, event: "Rajiv Orozco Quartet", venue: "Velvet Lounge, Chicago!", date: "March 10, 2025" },
    //     { id: 5, event: "Brass Tracks Orchestra", venue: "Velvet Lounge, Chicago!", date: "March 12, 2025" },
    //     { id: 6, event: "Dropkick Murpheys", venue: "Velvet Lounge, Chicago!", date: "March 15, 2025" },
    //     { id: 7, event: "Paul Abella Trio", venue: "Imperial Oak, Willow Springs", date: "March 17, 2025" },
    //     { jsonObject: googleMapsUri }
    // ];

    //console.log(typeof data);
    
    //console.log(typeof googleMapsUri.toJSON());
    
    //const newJson = JSON.stringify(googleMapsUri);
    
    //console.log(typeof newJson, newJson);
    
    //console.log("This is the spot before the return statement");                      
    //console.log(typeof googleMapsUri.href);
    //console.log(googleMapsUri.href);

    //return Response.json([{ id: 1, event: "An Evening of Jazz - Jazz Faculty Recital", venue: "Jazz Showcase, Chicago", date: "Friday, February 21, 2025" }]);
    
    //const encodedVenue = encodeURIComponent(venue);
    //const encodedCity = encodeURIComponent(city);
    //console.log("Encoded Venue: ", encodedVenue);
    //console.log("Encoded City: ", encodedCity);
    //console.log("Request URI from MAP HANDLER: ", requestUri);
    //console.log("Google Maps URL: ", baseUrl + "?address=")
    //console.log("Map Request URI: ", baseUrl + "?address=" + 
    //    venue?.replace(" ", "&20") + "," + city?.replace(" ", "%20") + "&key=" + api_key);
    //console.log("Venue from mapHandler file: ", venue);
    //console.log("City from mapHandler file: ", city);
    //console.log("This is gonna be the new url: ", `${baseUrl}?address=${venue},${city}`)
    //console.log("Going back to index file now...");

    // console.log("Response from Google Maps API: ", response.data);
    //return Response.json();
    // const requestUrl = new URL(request.url, "")

    // //const { venue, city } = request.query;

    // try {
    //     const response = await api_client.get(request.url, "?address=", venue, city, "&key=", api_key);


    // } catch (error) {
    //     console.error(error);
    // };




