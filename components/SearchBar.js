import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={styles.renderLeftButton}>
            <Ionicons name="location-sharp" size={24} color="black" />
          </View>
        )}
        renderRightButton={() => (
          <View style={styles.renderRightButton}>
            <AntDesign
              name="clockcircle"
              size={12}
              color="black"
              style={styles.antDesign}
            />
            <Text>Search</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  renderLeftButton: {
    marginLeft: 10,
  },
  renderRightButton: {
    flexDirection: "row",
    marginRight: 8,
    backgroundColor: "white",
    padding: 9,
    borderRadius: 30,
    alignItems: "center",
  },
  antDesign: {
    marginRight: 6,
  },
});
