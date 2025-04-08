from flask import jsonify
import requests
import os
from dotenv import load_dotenv

#Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def fetch_google_maps_data(address):
    #Fetch data from the google maps api for a given address string.
    google_maps_url = "https://maps.googleapis.com/maps/api/geocode/json"

    params = {
        "address": address,
        "key": API_KEY
    }
    
    try:
        response = requests.get(google_maps_url, params=params)
        response.raise_for_status()  # Raises an error for bad responses
        data = response.json()
        
        if data.get("status") != "OK" or not data.get("results"):
            return None
        
        # Else, extract relevant data
        result = data["results"][0]

        google_maps_data = {
            "latitude": result["geometry"]["location"]["lat"],
            "longitude": result["geometry"]["location"]["lng"],
            "formatted_address": result["formatted_address"].replace(", USA", ""),
        }
        
        return google_maps_data
    except:
        print("\n\n***Error fetching data from Google Maps API***\n\n")
    

    return None

    #print( f"Fetching data for address: {address}" )
    # Make a GET request to the Google Maps API
    #try:
        # response.raise_for_status() # Raises an error for bad responses
        # data = response.json()

        
        
        # 
        # result = data["results"][0]
        # google_maps_data = {
        #     "latitude": result["geometry"]["location"]["lat"],
        #     "longitude": result["geometry"]["location"]["lng"],
        #     "formatted_address": result["formatted_address"],
        # }

        # return google_maps_data


    # except requests.exceptions.RequestException as e:
    #     print(f"{e}\n\n***Error fetching data from Google Maps API***")
    #     return None