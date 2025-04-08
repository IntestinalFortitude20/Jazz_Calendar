//import * as React from 'react';
import React, { useState } from 'react';
import { Avatar, AvatarIconProps, Button, IconButton, Card, Text } from 'react-native-paper';
import { View, StyleSheet, ViewStyle, Dimensions, Linking, Modal, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Event } from "@/app/types/Event";
import { useRouter, Link } from "expo-router";
import EventModal from "@/app/modals/modal";
import * as WebBrowser from "expo-web-browser";
//import { AvatarProps } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';



type Props = Event & {
  style?: ViewStyle
  onPress?: () => void;
}

//COME BACK TO THIS TO CHECK THE TYPE OF THE PROPS ARGUMENT
const windowWidth = Dimensions.get('window').width;
const LeftContent = (props: any) => <Avatar.Icon {...props} icon={"music"} color="#fff" backgroundColor="#000000" />;

//const EventCard: React.FC<Props> = ({city, date, event, id, onPress, style, venue, website}: Props) => {
export default function EventCard({city, date, event, id, onPress, style, venue, website}: Props) {
  const [cardInfoModalVisible, setCardInfoModalVisible] = useState<boolean>(false);

  function openCardInfoModal() {
    setCardInfoModalVisible(true);
  };

  function closeCardInfoModal() {
    setCardInfoModalVisible(false);
  };

  return (
  <>
    <Pressable onPress={openCardInfoModal}>
      <Card 
        style={styles.card}
      >
          <Card.Title  
            title={date.start_date + " | " + date.start_time}
            titleStyle={[styles.text, {marginTop: 15, marginBottom: 5, fontSize: 18}]}
            style={{minHeight: 25}}
            //left={LeftContent} 
          />

          <Card.Content>
            <Text style={[styles.text, { fontWeight: "bold", paddingBottom: 0, paddingTop: 0}]} variant="titleLarge">{event}</Text>
            <Text style={styles.text} variant="titleMedium">{venue + " | " + city}</Text>
          </Card.Content>

          <Card.Actions style={styles.actions}>
            <IconButton
              icon="web"
              iconColor="#fff"
              backgroundColor="#000000"
              size={24}
              onPress={ async () => {   
                const result = await WebBrowser.openBrowserAsync(website)
              }}
            />
            <IconButton
              icon="directions"
              iconColor="#fff"
              backgroundColor="#000000"
              size={24}
              onPress={onPress}
            />
            <IconButton
              icon="share-variant"
              iconColor="#fff"
              //backgroundColor="#000000"
              size={24}
              onPress={() => console.log("Share Pressed", date.original_date, "\n", event, "\n", venue, "\n", city, "\n", website)}
            />
            <IconButton
              icon="bookmark"
              iconColor={"#fff"}
              //backgroundColor={"#000000"}
              size={24}
              onPress={() => console.log("Save Pressed")}
            />
          </Card.Actions>
      </Card>
    </Pressable>
    
    
    {
    //console.log("Modal visibility: ", cardInfoModalVisible)
    }


    {cardInfoModalVisible &&
      <EventModal
          city={city}
          date={date}
          event={event}
          id={id}
          venue={venue}
          website={website}
          isVisible={cardInfoModalVisible}
          onClose={closeCardInfoModal}>
      </EventModal>
    }
    </>
  );
};



const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 5,
    //flex: 3,
    //flexDirection: "column",
    //alignSelf: "center",
    width: windowWidth * 0.95,
    height: "auto",
    //maxHeight: 600,
    borderRadius: 8,
    backgroundColor: "#f4f5f6", // Card background color
    elevation: 4, // Customize the elevation (shadow)
  },
  text: {
    color: "#000000",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center", 
  },
  button: {
    flex: 1,
    marginHorizontal: 0,
  }
});




/*
<Button 
  style={styles.button}
  icon={"share"}
  buttonColor="#000000"
  textColor="#fff">Share</Button>
<Button 
  style={styles.button}
  icon={"bookmark"}>Save</Button>
<Button 
  buttonColor={"#000000"}
  textColor={"#fff"} 
  style={styles.button}
  icon={"map"}>Map</Button>

*/