import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { addToCart } from "../../redux/reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";

export default function MenuItems({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft,
}) {
  const dispatch = useDispatch();
  // const { selectedItems } = useSelector((state) => state.cart);
  // console.log(selectedItems.items);

  const cartItems = useSelector((state) => state.cart.selectedItems.items);
  // console.log("cartItems =>", cartItems);

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.food.title === food.title));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemContainer}>
            {hideCheckbox ? null : (
              <BouncyCheckbox
                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                fillColor="green"
                onPress={(isChecked) =>
                  dispatch(
                    addToCart({
                      food: food,
                      restaurantName: restaurantName,
                      checkboxValue: isChecked,
                    })
                  )
                }
                isChecked={isFoodInCart(food, cartItems)}
              />
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View style={styles.foodInfoContainer}>
    <Text style={styles.title}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = ({ marginLeft, ...props }) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{ ...styles.foodImageContainer, marginLeft: marginLeft }}
    />
  </View>
);

const styles = StyleSheet.create({
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  foodInfoContainer: {
    width: 240,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
  },
  foodImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
