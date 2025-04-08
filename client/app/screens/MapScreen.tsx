import { Text, View, StyleSheet } from "react-native";
import { Link, Stack, useRouter, } from "expo-router";
import MapView, { Marker } from 'react-native-maps';
import Axios from "axios";

export default function MapScreen() {
  //const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Map Screen</Text>
    </View>
  );




}
  //const { latitude, longitude, formattedAddress };

  // async function getMap(id: number) {
  //   try {
  //     const event = filteredEvents.find( (e) => e.id === id);
      
  //     const requestUri = `/api/mapHandler?venue=${encodeURIComponent(event.venue)}&city=${encodeURIComponent(event.city)}`;
      
  //     const response = await fetch(requestUri);
      
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch map data");
  //     }
      
  //     const data = await response.json();
  //     console.log("Made it back here");
      

  //   } catch (error) {
  //     console.error(error, "Error in file: index.tsx (handleShowMap)");
  //   }

  // }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.address}>{formattedAddress}</Text>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: latitude,
//           longitude: longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
//       </MapView>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  address: {
    fontSize: 18,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});