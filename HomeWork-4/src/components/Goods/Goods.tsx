import { FC, useEffect, useState } from "react";
import { HandySvg } from "handy-svg";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { toggleFavorites } from "../../store/favorites/favoritesSlice";
import { addGoodsToCart } from "../../store/cart/cartSlice";

import { IGoods } from "../../models";

import "./Goods.scss";

import star from "../../resources/img/star.svg";

interface IProps {
  goods: IGoods;
}

export const Goods: FC<IProps> = ({ goods }) => {
  const { name, price, url, color, id, cartAmount } = goods;
  const dispatch = useAppDispatch();
  const favoritesStore = useAppSelector((state) => state.favorites.favorites);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesStore.includes(id));
  }, [favoritesStore]);

  const toggleFavoriteInLocalStore = (id: string) => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(id)) {
      favorites = favorites.filter((item: string) => item !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const addGoodsInLocalStore = (goods: IGoods) => {
    const { color, id, name, price, url } = goods;
    const cartList: IGoods[] = JSON.parse(localStorage.getItem("cart") || "[]");

    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === goods.id) {
        cartList[i].cartAmount += 1;

        localStorage.setItem("cart", JSON.stringify(cartList));
        return;
      }
    }

    cartList.push({ color, id, name, price, url, cartAmount: 1 });
    localStorage.setItem("cart", JSON.stringify(cartList));
  };

  return (
    <li className="goods">
      <img src={url} alt={name} className="goods__img" />
      <h2 className="goods__title">{name}</h2>
      <p className="goods__price">Цена: {price}</p>
      <p className="goods__color">Цвет: {color}</p>
      {cartAmount > 0 && (
        <p className="goods__count">В корзине: {cartAmount}</p>
      )}
      <div className="goods__actions-wrapper">
        <button
          className="btn"
          onClick={() => {
            dispatch(addGoodsToCart(goods));
            addGoodsInLocalStore(goods);
          }}
        >
          В корзину
        </button>
        <div
          className={classNames("goods__favorite", {
            "goods__favorite--active": isFavorite,
          })}
          onClick={() => {
            dispatch(toggleFavorites(id));
            toggleFavoriteInLocalStore(id);
          }}
        >
          <HandySvg src={star} />
        </div>
      </div>
    </li>
  );
};
