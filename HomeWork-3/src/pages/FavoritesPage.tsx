import { FC } from "react";
import { Favorites } from "../components/Favorites/Favorites";
import { IGoods } from "../models";

interface IProps {
  favorites: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
}

export const FavoritesPage: FC<IProps> = ({
  favorites,
  addToCart,
  addToFavorites,
}) => {
  return (
    <Favorites
      addToCart={addToCart}
      addToFavorites={addToFavorites}
      favorites={favorites}
    />
  );
};
