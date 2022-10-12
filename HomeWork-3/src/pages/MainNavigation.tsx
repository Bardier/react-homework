import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { GoodsPage } from "./GoodsPage";
import { CartPage } from "./CartPage";
import { FavoritesPage } from "./FavoritesPage";
import { IGoods } from "../models";

interface IProps {
  goods: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
  favorites: IGoods[];
  cart: IGoods[];
  removeFromCart: (newGoods: IGoods) => void;
}

export const MainNavigation: FC<IProps> = ({
  goods,
  addToCart,
  addToFavorites,
  favorites,
  cart,
  removeFromCart,
}) => {
  return (
    <Routes>
      <Route
        index
        element={
          <GoodsPage
            goods={goods}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
          />
        }
      />

      <Route
        path="cart"
        element={
          <CartPage
            cart={cart}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
            removeFromCart={removeFromCart}
          />
        }
      />

      <Route
        path="favorites"
        element={
          <FavoritesPage
            addToCart={addToCart}
            addToFavorites={addToFavorites}
            favorites={favorites}
          />
        }
      />

      <Route path="*" element={<p>Нет такой страницы.</p>} />
    </Routes>
  );
};
