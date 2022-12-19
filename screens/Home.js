import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../components/RestaurantItems";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  return (
    <SafeAreaView
      style={[styles.AndroidSafeArea, styles.SafeAreaViewContainer]}
    >
      <View style={styles.viewContainer}>
        <HeaderTabs />
        <SearchBar />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  SafeAreaViewContainer: {
    backgroundColor: "#eee",
    flex: 1,
  },
  viewContainer: {
    backgroundColor: "white",
    padding: 15,
  },
});
