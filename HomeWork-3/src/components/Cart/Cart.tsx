import { FC } from "react";
import { IGoods } from "../../models";
import { Card } from "../Cards/Card";

interface IProps {
  cart: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
  removeFromCart: (newGoods: IGoods) => void;
}

export const Cart: FC<IProps> = ({
  cart,
  addToCart,
  addToFavorites,
  removeFromCart,
}) => {
  const renderCart = cart.map((card) => (
    <Card
      card={card}
      key={card.id}
      addToCart={addToCart}
      addToFavorites={addToFavorites}
      removeFromCart={removeFromCart}
      buyButton={false}
    />
  ));
  return (
    <>
      <h1 className="page-title">Корзина</h1>
      <ul className="cards-list">{renderCart}</ul>
    </>
  );
};
