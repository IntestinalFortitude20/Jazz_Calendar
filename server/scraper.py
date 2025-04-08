# This is a simple scraper that will scrape the WDCB Jazz Calendar for events

import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime



def extract_time_from_date(date_string):
    start_time = None
    end_time = None

    #Handle time if there is a range (e.g., "from 7:30pm to 10:00pm")
    if "from" in date_string and "to" in date_string:
        time_range = re.search(r'from\s+(.*?)\s+to\s+(.*)', date_string, re.IGNORECASE)
        if time_range:
            start_time = time_range.group(1).strip()
            end_time = time_range.group(2).strip()
    #Handle single time (e.g., "at 7:30pm")
    elif "at" in date_string:
        single_time = re.search(r'\bat\b\s+(.*)', date_string, re.IGNORECASE)
        if single_time:
            start_time = single_time.group(1).strip()
            end_time = None

    if end_time != None:
        if end_time.lower() == "midnight":
            end_time = "12:00am"
        end_time = format_time(end_time)

    if start_time != None: 
        start_time = format_time(start_time)


    return {
        "start_time": start_time,
        "end_time": end_time
    }

def format_time(time_string):
    if "am" not in time_string and "pm" not in time_string:
        time_string += "pm"
    try:
        # Parse "HH:MMpm" format (e.g., "7:30pm")
        parsed_time = datetime.strptime(time_string, "%I:%M%p")
    except ValueError:
        try:
            # Parse "HHpm" format (e.g., "7pm)
            parsed_time = datetime.strptime(time_string, "%I%p")
        except ValueError:
            try:
                # Parse "HH:MM" format (e.g., "7:30" without am/pm)
                parsed_time = datetime.strptime(time_string, "%I:%M")
                #time_string += "pm"
            except ValueError:
                try:
                    # Parse "HH" format (e.g., "7" without am/pm)
                    parsed_time = datetime.strptime(time_string, "%I")
                    #time_string += "pm"
                except ValueError:
                    time_string += "pm"
                    return time_string

    #return time_string # Return the original string if it cannot be converted
    
    formatted_time = parsed_time.strftime("%I:%M%p").lower().lstrip("0") #format to "h:mmpm" format

    return formatted_time

def format_date(date_string):
    date_string = " ".join(   date_string.split()[:3]   ).strip()   
    #test_date = "Thu, Sep 30"
    current_date = datetime.now()
    current_year = current_date.year
    date_with_year = date_string + f", {current_year}"

    try:
        parsed_date = datetime.strptime(date_with_year, "%a, %b %d, %Y")

        if parsed_date.month < current_date.month or (parsed_date.month == current_date.month and parsed_date.day < current_date.day):
            parsed_date = parsed_date.replace(year = current_year + 1)

        #print("parsed_date: ", parsed_date)
        formatted_date = parsed_date.strftime("%A, %B %d")
        #print("formatted_date: ", formatted_date)
        return formatted_date
    except ValueError:
        return date_string

def parse_date_range(date_string):
    #Handle date if there is a range
    if "through" in date_string:
        start_date = date_string.split("through")[0].strip()
        end_date = date_string.split("through")[1].strip()
    else:
        #Handle single dates
        if "at" in date_string:
            start_date = date_string.split("at")[0].strip()
        elif "from" in date_string and "to" in date_string:
            start_date = date_string.split("from")[0].strip()
        else:
            start_date = date_string.strip()
        end_date = None

    #Format dates
    start_date = format_date(start_date)
    if end_date != None:
        format_date(end_date)

    #Return dictionary with start and end dates
    return {
        "start_date": start_date,
        "end_date": end_date,
    }
    

def scrape_jazz_events():
    result = requests.get("https://wdcb.org/events/jazz")
    src = result.content
    soup = BeautifulSoup(src, 'html.parser')

    events = []
    event_id = 0

    

    for i in soup.find_all("div", class_="well well-sm"):
        date_string = " ".join(i.find("span", class_="text-uppercase").text.strip().split())
        
        event = {
                "id": event_id,
                "date": {
                    "original_date": date_string,
                    "start_date": parse_date_range(date_string).get("start_date"),
                    "end_date": parse_date_range(date_string).get("end_date"),
                    "start_time":  extract_time_from_date(date_string).get("start_time"), 
                    "end_time": extract_time_from_date(date_string).get("end_time"),

                    #(  i.find("span", class_="text-uppercase").text.strip().split()   ),
                    #"formatted_date": format_date(date_string),
                    #"day": date_string.split(",")[0],
                    #"day": i.find("span", class_="text-uppercase").text.strip().split()[0],
                    #"month": date_string.split(",")[1].strip().split()[0],
                    #"month": i.find("span", class_="text-uppercase").text.strip().split()[1],
                    #"formatted_date": " ".join(i.find("span", class_="text-uppercase").text.strip().split())
                    },
                #"time": i.find("span", class_="text-uppercase").text.strip().split()[0],
                "event": i.find("a").text.split(":")[-1].strip(),
                "venue": i.text.split("\n")[-1].strip().split(" - ")[0].strip(),
                "city": i.text.split("\n")[-1].strip().split(" - ")[-1].strip(),
                "website": i.find("a").attrs["href"]
                }
        events.append(event)
        event_id += 1
    
    return events






# Requests makes a GET request to the URL and stores the response in a variable

#json_string = json.dumps(events, indent=4)
#print(json_string)


#print(result.status_code) #200 means the request was successful; 404 is not found

# Check the headers of the response to ensure the correct page was returned
#print(result.headers)

# Store the content of the page in a variable

# Now that we have the page source stored, we can use BeautifulSoup to parse the HTML content
# The parsed content is stored in a BeautifulSoup object



### FIND ALL DIV ELEMENTS WITH EVENT INFORMATION ###
    
    # event["time"] = " ".join( i.find("span", class_="text-uppercase").text.strip().split() )
    # #time = re.sub(r"\s+", " ", time)   <<<--- This is a regular expression that removes extra white spaces, as an alternative
    # event["name"] = i.find("a").text.split(":")[-1].strip()
    # event["location"] = i.text.split("\n")[-1].strip()
    # event["website"] = i.find("a").attrs["href"]

  

# Print the events list in JSON format

# Create a list to store the div elements that contain the event information
# Find all div elements with the class "well well-sm" and store them in the list
# These divs contain event information

