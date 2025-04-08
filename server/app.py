### START THE VENV BEFORE ADDING DEPENDENCIES OR RUNNING SERVER ###
### USE "source venv/scripts/activate" TO START THE VENV ###
### RUN "PYTHON APP.PY" TO START THE DEV SERVER ###
### RUN "deactivate" TO STOP THE VENV ###

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_caching import Cache
from scraper import scrape_jazz_events
from maps_api import fetch_google_maps_data


app = Flask(__name__)
CORS(app)

# Configure caching
app.config['CACHE_TYPE'] = 'SimpleCache'  # Use SimpleCache for development
app.config['CACHE_DEFAULT_TIMEOUT'] = 60 * 60 * 24  # Cache timeout: 24 hours
cache = Cache(app)

@app.route('/events/jazz', methods=['GET'])
def get_jazz_events():
    events = scrape_jazz_events()
    return jsonify(events)

@app.route('/map', methods=['GET'])
def get_map():
    address = request.args.get("address")
    
    if not address:
        return jsonify({"error": "No address provided"}), 400
    
    map_data = fetch_google_maps_data(address)

    return jsonify(map_data)


#def get_map_data():
    # Get the venue and city from the request
    #print(venue, city)
    # # Create a cache key
    # cache_key = f"{venue.lower().strip()}_{city.lower().strip()}"
    # print(cache_key)
    # # Check if the data is already cached
    # cached_data = Cache.get(cache_key)

    # if cached_data:
    #     print("Cache HIT!")
    #     return jsonify(cached_data)
    
    # If not cached, fetch the data from the Google Maps API
    #google_maps_data = fetch_google_maps_data(venue, city)

    # if not google_maps_data:
    #     return jsonify({"error": "No data found"}), 404

    # # Cache the data
    # Cache.set(cache_key, google_maps_data)

    # test_data = Cache.get(cache_key)
    # if test_data:
    #     print("New data cached successfully!")
    # else:
    #     print("Failed to cache new data.")

if __name__ == '__main__':
    app.run(host='localhost', port=5050, debug=True)
    #app.run(debug=True, host='0.0.0.0', port=8080)