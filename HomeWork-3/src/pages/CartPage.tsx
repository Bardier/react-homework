import { FC } from "react";
import { IGoods } from "../models";

import { Cart } from "../components/Cart/Cart";

interface IProps {
  cart: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
  removeFromCart: (newGoods: IGoods) => void;
}

export const CartPage: FC<IProps> = ({
  cart,
  addToCart,
  addToFavorites,
  removeFromCart,
}) => {
  return (
    <div>
      <Cart
        cart={cart}
        addToCart={addToCart}
        addToFavorites={addToFavorites}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};
