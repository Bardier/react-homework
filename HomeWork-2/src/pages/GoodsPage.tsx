import { Component, ReactNode } from "react";
import CardsList from "../components/Cards/CardsList";
import { IGoods } from "../models";

interface GoodsPageProps {
  goods: IGoods[];
  addToCart: (newGoods: IGoods) => void;
  setFavorites: (newFavorite: IGoods) => void;
}

export default class GoodsPage extends Component<GoodsPageProps> {
  render(): ReactNode {
    const { goods, addToCart, setFavorites } = this.props;
    return (
      <>
        <CardsList
          goods={goods}
          addToCart={addToCart}
          setFavorites={setFavorites}
        />
      </>
    );
  }
}
