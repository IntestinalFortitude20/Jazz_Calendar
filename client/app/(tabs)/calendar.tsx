import { Text, View, StyleSheet } from "react-native";


export default function Calendar() {
  return (
    <View style={styles.container}>
      <Text style={styles.textLarge}>Calendar Screen</Text>
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
  },
  textLarge: {
    color: '#fff',
    fontSize: 40,
  }
});