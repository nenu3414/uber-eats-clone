import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: { items: [], restaurantName: "" },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      let newState = { ...state };

      if (payload.checkboxValue) {
        // console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, payload],
          restaurantName: payload.restaurantName,
        };
      } else {
        // console.log("REMOVE FROM CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.food.title !== payload.food.title
            ),
          ],
          restaurantName: payload.restaurantName,
        };
      }
      // console.log(newState, "👉");
      return newState;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
