import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import db from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Lottie from "lottie-react-native";
import { useNotifications } from "../../useNotification";

export default function ViewCart({ navigation }) {
  const { sendPushNotification } = useNotifications();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const addOrderToFirebase = () => {
    setLoading(true);
    addDoc(collection(db, "orders"), {
      items: items,
      restaurantName: restaurantName,
      createdAt: serverTimestamp(),
    }).then(() => {
      setTimeout(() => {
        setLoading(false);
        navigation.navigate("OrderCompleted");
      });
    }, 2500);
  };

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item.food} />
            ))}
            <View style={styles.subTotalContainer}>
              <Text style={styles.subTotalText}>Total</Text>
              <Text
                style={{
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: "black",
                  alignItems: "center",
                  padding: 8,
                }}
              >
                ${totalUSD}
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.checkoutTouchable}
                onPress={async () => {
                  addOrderToFirebase();
                  setModalVisible(false);
                  await sendPushNotification(
                    "ExponentPushToken[REbpjzDhq89OQCJmLh0bDA]"
                  );
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View style={styles.viewCart}>
          <View style={styles.viewCartSub}>
            <TouchableOpacity
              style={styles.viewCartTouchable}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.text}>View Cart</Text>
              <Text style={styles.totalUSD}>${totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {loading ? (
        <View style={styles.loader}>
          <Lottie
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    marginRight: 50,
  },
  viewCartTouchable: {
    marginTop: 20,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    borderRadius: 30,
    width: 300,
    position: "relative",
  },
  viewCartSub: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  viewCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: "5%",
    zIndex: 1,
  },
  totalUSD: {
    color: "white",
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },
  restaurantName: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 10,
  },
  subTotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 20,
  },
  subTotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  checkoutTouchable: {
    marginTop: 20,
    backgroundColor: "black",
    alignItems: "center",
    padding: 13,
    borderRadius: 30,
    width: 300,
    position: "relative",
  },
  loader: {
    backgroundColor: "black",
    position: "absolute",
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
