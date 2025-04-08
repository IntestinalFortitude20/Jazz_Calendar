import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.textLarge}>About Screen</Text>
      <Text style={styles.text}>This is my Jazz Calendar app. 
        It uses the WDCB Chicago Jazz Calendar website, 
        scrapes the event information, and presents it to the 
        user. If you like it, buy me a cup of coffee sometime!</Text>
      <Link href="https://wdcb.org/" style={styles.text}>https://wdcb.org/</Link>
    
    </View>
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
    padding: 35,
  },
  textLarge: {
    color: '#fff',
    fontSize: 40,
  },
});