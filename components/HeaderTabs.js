import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function HeaderTabs() {
  const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <View style={styles.headerTabscontainer}>
      <HeaderButton
        text="Delivery"
        btnColor="black"
        textColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        btnColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

const HeaderButton = (props) => (
  <View>
    <TouchableOpacity
      style={[
        styles.touchableOpacityContaner,
        { backgroundColor: props.activeTab === props.text ? "black" : "white" },
      ]}
      onPress={() => props.setActiveTab(props.text)}
    >
      <Text
        style={[
          styles.text,
          { color: props.activeTab === props.text ? "white" : "black" },
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  headerTabscontainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  touchableOpacityContaner: {
    backgroundColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "900",
  },
});
