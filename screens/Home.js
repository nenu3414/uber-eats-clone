import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import BottomTabs from "../components/home/BottomTabs";
import { REACT_APP_YELP } from "@env";

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = async () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    console.log("City=>", city);

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${REACT_APP_YELP}`,
      },
    };

    const res = await fetch(yelpUrl, apiOptions);
    const json = await res.json();
    return setRestaurantData(
      json.businesses.filter((business) =>
        business.transactions.includes(activeTab.toLowerCase())
      )
    );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);
  return (
    <SafeAreaView
      style={[styles.AndroidSafeArea, styles.SafeAreaViewContainer]}
    >
      <View style={styles.viewContainer}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <BottomTabs />
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
