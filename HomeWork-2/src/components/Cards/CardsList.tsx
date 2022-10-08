import "./CardsList.scss";

import { Component, ReactNode } from "react";
import { IGoods } from "../../models";
import Card from "./Card";

interface CardsListProps {
  goods: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  setFavorites: (newFavorite: IGoods) => void;
}

export default class CardsList extends Component<CardsListProps> {
  render(): ReactNode {
    const { goods, addToCart, setFavorites } = this.props;

    return (
      <>
        <h1 className="page-title">Товары недели</h1>
        <ul className="cards-list">
          {goods.map((card) => (
            <Card
              card={card}
              key={card.id}
              addToCart={addToCart}
              setFavorites={setFavorites}
            />
          ))}
        </ul>
      </>
    );
  }
}
