import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formattedCategories = categories.map((cat) => cat.title).join(" • ");

  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  } • 🎫 • ${rating} ⭐ (${reviews}+)`;
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={styles.imageContainer} />
);

const RestaurantName = (props) => (
  <Text style={styles.titleContainer}>{props.name}</Text>
);

const RestaurantDescription = (props) => (
  <Text style={styles.descriptionContainer}>{props.description}</Text>
);

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 180,
  },
  titleContainer: {
    fontSize: 29,
    fontWeight: "600",
    marginTop: 10,
    marginHorizontal: 15,
  },
  descriptionContainer: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
    marginHorizontal: 15,
  },
});
