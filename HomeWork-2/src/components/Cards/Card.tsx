import "./Card.scss";

import { Component, ReactNode } from "react";
import { IGoods } from "../../models";
import Button from "../Button/Button";
import heart from "../../resources/img/heart.png";
import heartColor from "../../resources/img/heart-color.png";

interface CardProps {
  card: IGoods;
  addToCart: (newGoods: IGoods) => void;
  setFavorites: (newFavorite: IGoods) => void;
}

interface CardState {
  favorite: boolean;
}

export default class Card extends Component<CardProps, CardState> {
  state: Readonly<CardState> = {
    favorite: false,
  };

  componentDidMount() {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.forEach((el: IGoods) => {
      if (el.id === this.props.card.id) {
        this.setState({ favorite: true });
      }
    });
  }

  setFavorite = () => {
    this.setState(({ favorite }) => ({ favorite: !favorite }));
  };

  render(): ReactNode {
    const { color, id, name, price, url } = this.props.card;
    const { addToCart, setFavorites } = this.props;
    const { favorite } = this.state;

    return (
      <li className="card">
        <img src={url} alt={name} className="card__img" />
        <h2 className="card__title">{name}</h2>
        <div className="card__params">
          <p className="card__id">ID: {id}</p>
          <p className="card__color">Цвет: {color}</p>
          <p className="card__price">
            <span>{price}</span> грн.
          </p>
          <div
            className="card__favorite"
            style={{
              backgroundImage: `url(${favorite ? heartColor : heart})`,
            }}
            onClick={() => {
              setFavorites(this.props.card);
              this.setFavorite();
            }}
          ></div>
        </div>
        <Button
          bgColor="green"
          onClick={() => addToCart(this.props.card)}
          text="Купить"
        />
      </li>
    );
  }
}
