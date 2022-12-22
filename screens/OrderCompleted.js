import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react-native";
import MenuItems from "../components/restaurantDetail/MenuItems";
import { collection, getDocs, doc } from "firebase/firestore";
import db from "../firebase";

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Bologna",
        description: "With butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
      },
    ],
  });
  const { items, restaurantName } = useSelector(
    (state) => state.cart.selectedItems
  );

  const total = items
    .map((item) => Number(item.food.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const colRef = collection(db, "orders");
    const unsubscribe = getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // console.log("doc data=>", doc.data());
          setLastOrder(doc.data());
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView
      style={[styles.AndroidSafeArea, styles.SafeAreaViewContainer]}
    >
      <View style={styles.OrderCompletedContainer}>
        <Lottie
          style={{ height: 100, alignSelf: "center", marginBottom: 30 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={true}
        />
        <Text style={styles.completeOrderText}>
          Your order at {restaurantName} has been placed for ${totalUSD}
        </Text>
        <ScrollView>
          <MenuItems
            foods={lastOrder.items}
            hideCheckbox={true}
            marginLeft={10}
          />
          <Lottie
            style={{ height: 200, alignSelf: "center" }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
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
    backgroundColor: "white",
    flex: 1,
  },
  OrderCompletedContainer: {
    margin: 15,
    alignItems: "center",
    height: "100%",
  },
  completeOrderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
