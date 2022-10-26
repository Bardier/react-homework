import { configureStore } from "@reduxjs/toolkit";
import goodsSlice from "./goods/goodsSlice";
import favoritesSlice from "./favorites/favoritesSlice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    goods: goodsSlice,
    favorites: favoritesSlice,
    cart: cartSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
