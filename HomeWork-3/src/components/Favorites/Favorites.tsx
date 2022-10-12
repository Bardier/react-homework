import { FC } from "react";
import { IGoods } from "../../models";
import { Card } from "../Cards/Card";

interface IProps {
  favorites: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
}

export const Favorites: FC<IProps> = ({
  favorites,
  addToCart,
  addToFavorites,
}) => {
  const renderFavorites = favorites.map((card) => (
    <Card
      card={card}
      key={card.id}
      addToCart={addToCart}
      addToFavorites={addToFavorites}
    />
  ));

  return (
    <>
      <h1 className="page-title">Избранное</h1>
      <ul className="cards-list">{renderFavorites}</ul>
    </>
  );
};
