import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoods } from "../../models";

type CartState = {
  cart: IGoods[];
};

const initialState: CartState = {
  cart: [
    // {
    //   name: "Cartridge Canon 726 для LBP-6200d",
    //   price: 3312,
    //   url: "https://images.ua.prom.st/81866362_81866362.jpg?PIMAGE_ID=81866362%20",
    //   id: "p36951026",
    //   color: "black",
    //   cartAmount: 1,
    // },
    // {
    //   name: "Лазерний чорний картридж Canon 731 black для принтерів LBP7100Cn/ LBP7110Cw",
    //   price: 2414,
    //   url: "https://images.ua.prom.st/81897526_81897526.jpg?PIMAGE_ID=81897526%20",
    //   id: "p36972977",
    //   color: "black",
    //   cartAmount: 2,
    // },
    // {
    //   name: "Лазерний картридж чорний Canon 719H для принтерів Canon LBP-6300dn/6650dn, MF5580dn/ 5840dn",
    //   price: 5985,
    //   url: "https://images.prom.ua/81862717_81862717.jpg?PIMAGE_ID=81862717",
    //   id: "p36949902",
    //   color: "black",
    //   cartAmount: 3,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addGoodsToCart: (state, action: PayloadAction<IGoods>) => {
      let wasAddedcartAmount = false;
      state.cart.forEach((item) => {
        if (item.id === action.payload.id && item.cartAmount) {
          item.cartAmount += 1;
          wasAddedcartAmount = true;
          return;
        }
      });
      if (!wasAddedcartAmount) {
        const newGoods: IGoods = {
          name: action.payload.name,
          price: action.payload.price,
          color: action.payload.color,
          id: action.payload.id,
          url: action.payload.url,
          cartAmount: 1,
        };
        state.cart.push(newGoods);
      }
    },
    removeGoodsFromCart: (state, action: PayloadAction<IGoods>) => {
      state.cart.forEach((item) => {
        if (
          item.id === action.payload.id &&
          item.cartAmount &&
          item.cartAmount >= 2
        ) {
          item.cartAmount -= 1;
        } else if (item.id === action.payload.id && item.cartAmount) {
          state.cart = state.cart.filter((goods) => goods.id !== item.id);
        }
      });
    },
    addGoodsFromLocalStore: (state, action: PayloadAction<IGoods[]>) => {
      action.payload.forEach((goods) => {
        state.cart.push(goods);
      });
    },
  },
});

export const { addGoodsToCart, removeGoodsFromCart, addGoodsFromLocalStore } =
  cartSlice.actions;
export default cartSlice.reducer;
