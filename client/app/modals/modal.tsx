import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Button, Linking, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Event } from "@/app/types/Event";
import Coordinates from "@/app/types/Coordinates";
import { MaterialIcons } from "@expo/vector-icons";
import Axios from "axios";
import * as WebBrowser from "expo-web-browser";

type ModalProps = Event & {
    isVisible: boolean;
    onClose: () => void;
  };

//   useEffect(() => {
//     const fetchMapData = async () => {
//         await getMap(venue, city, isVisible);
//     };

//     if (isVisible) {
//         fetchMapData();
//     }
// }, [isVisible, venue, city]);

// const api_client = Axios.create({
//     baseURL: "http://127.0.0.1:5050",
// });


export default function EventModal({city, date, event, id, isVisible, onClose, venue, website}: ModalProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [coordinates, setCoordinates] = useState<Coordinates|null>(null);

    useEffect( () => {
        //console.log("\n\nuseEffect triggered (modal.tsx)\n\n");
        getMap(venue, city);     
    }, [isVisible] );
    
    
    async function getMap(venue: String, city: String) {
        
        if (!isVisible || !venue || !city) {
            return; // Only fetch map data when the modal is visible
        }
        // console.log("Loading map data...");
        setLoading(true);  // Show a loading indicator while fetching map data
        
        try {
            //console.log("Try/Catch block (modal.tsx)");
            
            const response = await fetch(`/api/mapHandler?venue=${venue}&city=${city}`);
            const mapData = await response.json();
            
            //console.log("Response from api (modal.tsx):\n", mapData);           
            
            const latitude = mapData.latitude;
            const longitude = mapData.longitude;
            const formatted_address = mapData.formatted_address;

            setCoordinates({latitude, longitude, formatted_address});
            //console.log(`\n\nCoordinates: \n${latitude}\n${longitude}\n${formatted_address}`);
            
            // Ensure the response contains the expected properties
            if (!mapData.latitude || !mapData.longitude || !mapData.formatted_address) {
                throw new Error("Invalid API response: Missing required properties");
            }

        } catch (error) {
            console.error(error, "Error in file: modal.tsx (useEffect)");
        } finally {
            setLoading(false);
            //console.log("loading complete");
        }
    };

    return (
        //consider changing this to a side-slide modal using Animated.View, and useEffect
        //Alternate code in comments below
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            ) : (
                <>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: coordinates?.latitude || 41.8781 , //, // Default latitude for Chicago
                            longitude: coordinates?.longitude || -87.6298, // Default longitude for Chicago
                            latitudeDelta: 0.004, // Zoom level (adjust as needed)
                            longitudeDelta: 0.002, // Zoom level (adjust as needed)
                            
                            // ZOOM NOTES:
                            // City level is about 0.05
                            // Neighborhood level is about 0.01 or 0.02 ish
                            // Street level is about 0.001 to about 0.005
                            // Building level is about 0.0005
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: coordinates?.latitude || 41.8781, // Latitude for Chicago
                                longitude: coordinates?.longitude || -87.6298, // Longitude for Chicago 
                            }}
                            title={venue || "Placeholder Venue"}
                            description={coordinates?.formatted_address || "Placeholder Address"}
                        />
                    </MapView>

                    {
                    // Go to https://icons.expo.fyi/Index for more icons
                    }
                    <View style={styles.textContainer}>
                        <View style={styles.textBox}>
                            <Text style={[styles.text, {fontSize: 20, fontWeight: "bold", marginBottom: 5}]}>Event Details</Text>
                        </View>
                        
                        <View style={styles.textBox}>
                            <MaterialIcons name="music-note" size={28} />
                            <Text style={styles.text}>{"\t" + event}</Text>
                        </View>
                        
                        <View style={styles.textBox}>
                            <MaterialIcons name="place" size={28} />
                            <Text style={styles.text}>{"\t" + venue + " | " + city}</Text>
                        </View>
                        
                        <View style={styles.textBox}>
                            <MaterialIcons name="maps-home-work" size={28} />
                            <Text style={styles.text}>{`\t${coordinates?.formatted_address}` }</Text>
                        </View>

                        <View style={styles.textBox}>
                            <MaterialIcons name="event" size={28} />
                            <Text style={styles.text}>{"\t" + date.start_date + " | " + date.start_time}</Text>
                        </View>

                        <View style={styles.textBox}>
                            <MaterialIcons name="web" size={28} />
                            <Text style={styles.text} onPress={ async () => {   
                              const result = await WebBrowser.openBrowserAsync(website)
                              }}>{"\t" + website || "Not available"}</Text>
                        </View>

                        <View style={styles.button}>
                            <Button title="Close Modal" onPress={onClose} />
                        </View>
                    </View>
                        
                </>
            )}
        </Modal>
    );
};


const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        //justifyContent: "center",
        margin: 15,
        alignItems: "flex-start",
    },
    map: {
        width: "100%",
        height: "50%",
    },
    textBox: {
        flexDirection: "row",
    },
    text: {
        color: '#000000',
        fontSize: 18,
        padding: 2,
        
    },
    button: {
        padding: 10,
        alignSelf: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})



/*
export default function EventModal({ isVisible, onClose }: ModalProps) {
  const slideAnim = useRef(new Animated.Value(screenWidth)).current; // Start off-screen to the right

  useEffect(() => {
    if (isVisible) {
      // Slide in from the right
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to the center of the screen
        duration: 300, // Animation duration in milliseconds
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out to the right
      Animated.timing(slideAnim, {
        toValue: screenWidth, // Slide off-screen to the right
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  if (!isVisible) {
    return null; // Don't render the modal when it's not visible
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }], // Apply the slide animation
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Event Details</Text>
        <Button title="Close Modal" onPress={onClose} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    padding: 20,
    backgroundColor: "#f4f5f6",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

 */