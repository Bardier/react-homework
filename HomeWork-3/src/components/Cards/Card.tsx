import { FC, useEffect, useState } from "react";
import { IGoods } from "../../models";
import { Button } from "../Button/Button";

import heart from "../../resources/img/heart.png";
import heartColor from "../../resources/img/heart-color.png";

import "./Card.scss";

interface IProps {
  card: IGoods;
  addToCart: (newGoods: IGoods) => void;
  addToFavorites: (newFavorite: IGoods) => void;
}

export const Card: FC<IProps> = ({ card, addToCart, addToFavorites }) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.forEach((el: IGoods) => {
      if (el.id === card.id) {
        setFavorite(true);
      }
    });
  }, []);

  const toggleFavorite = () => {
    setFavorite((prev) => !prev);
  };

  const { color, id, name, price, url } = card;

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
            addToFavorites(card);
            toggleFavorite();
          }}
        ></div>
      </div>
      <Button bgColor="green" onClick={() => addToCart(card)} text="Купить" />
    </li>
  );
};
