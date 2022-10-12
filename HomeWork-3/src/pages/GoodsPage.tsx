import { FC } from "react";
import { CardsList } from "../components/Cards/CardsList";
import { IGoods } from "../models";

interface IProps {
  goods: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
}

export const GoodsPage: FC<IProps> = ({ goods, addToCart, addToFavorites }) => {
  return (
    <>
      <CardsList
        goods={goods}
        addToCart={addToCart}
        addToFavorites={addToFavorites}
      />
    </>
  );
};
