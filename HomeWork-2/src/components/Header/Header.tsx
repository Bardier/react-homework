import "./Header.scss";

import { Component, ReactNode } from "react";
import logoImg from "../../resources/img/logo.png";
import heartImg from "../../resources/img/heart-color.png";
import cartImg from "../../resources/img/cart.png";

interface HeaderProps {
  cartCount: number;
  favoriteCount: number;
}

export default class Header extends Component<HeaderProps> {
  render(): ReactNode {
    const { cartCount, favoriteCount } = this.props;
    return (
      <header className="header">
        <img src={logoImg} alt="WorkService" className="header__logo" />
        <ul className="header__actions">
          <li className="header__actions-item">
            <img src={heartImg} alt="Корзина" className="header__actions-img" />
            <span className="header__actions-count">
              {favoriteCount !== 0 && favoriteCount}
            </span>
          </li>
          <li className="header__actions-item">
            <img src={cartImg} alt="Корзина" className="header__actions-img" />
            <span className="header__actions-count">
              {cartCount !== 0 && cartCount}
            </span>
          </li>
        </ul>
      </header>
    );
  }
}
