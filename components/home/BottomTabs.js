import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function BottomTabs() {
  return (
    <View style={styles.bottomTabsContainer}>
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="Browse" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon icon="receipt" text="Orders" />
      <Icon icon="user" text="Account" />
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity>
    <View>
      <FontAwesome5 name={props.icon} size={25} style={styles.iconContainer} />
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  bottomTabsContainer: {
    margin: 10,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    marginBottom: 3,
    alignSelf: "center",
  },
});
