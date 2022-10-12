import { FC } from "react";
import { IGoods } from "../../models";
import { Card } from "./Card";

import "./CardsList.scss";

interface IProps {
  goods: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
}

export const CardsList: FC<IProps> = ({ goods, addToCart, addToFavorites }) => {
  return (
    <>
      <h1 className="page-title">Товары недели</h1>
      <ul className="cards-list">
        {goods.map((card) => (
          <Card
            card={card}
            key={card.id}
            addToCart={addToCart}
            addToFavorites={addToFavorites}
          />
        ))}
      </ul>
    </>
  );
};
