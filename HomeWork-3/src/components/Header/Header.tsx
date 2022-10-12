import { FC } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

import logoImg from "../../resources/img/logo.png";
import heartImg from "../../resources/img/heart-color.png";
import cartImg from "../../resources/img/cart.png";

interface IProps {
  cartCount: number;
  favoriteCount: number;
}

export const Header: FC<IProps> = ({ cartCount, favoriteCount }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logoImg} alt="WorkService" className="header__logo" />
      </Link>

      <ul className="header__actions">
        <li className="header__actions-item">
          <Link to="/favorites">
            <img
              src={heartImg}
              alt="Избранное"
              className="header__actions-img"
            />
            <span className="header__actions-count">
              {favoriteCount !== 0 && favoriteCount}
            </span>
          </Link>
        </li>
        <li className="header__actions-item">
          <Link to="/cart">
            <img src={cartImg} alt="Корзина" className="header__actions-img" />
            <span className="header__actions-count">
              {cartCount !== 0 && cartCount}
            </span>
          </Link>
        </li>
      </ul>
    </header>
  );
};
