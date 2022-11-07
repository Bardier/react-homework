import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {HandySvg} from "handy-svg";
import {useAppSelector} from "../../hooks/storeHooks";

import "./Header.scss";

import logoImg from "../../resources/img/logo.png";
import cartImg from "../../resources/img/cart.png";
import star from "../../resources/img/star.svg";

export const Header: FC = () => {
  const favoritesCount = useAppSelector(
    (state) => state.favorites.favorites.length
  );
  const cartGoods = useAppSelector((state) => state.cart.cart);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cartGoods.forEach(({ cartAmount }) => {
      if (cartAmount) {
        count += cartAmount;
      }
    });
    setCartCount(count);
  }, [cartGoods]);

  return (
    <div className="header">
      <div className="header__logo-link">
        <Link to="/">
          <img src={logoImg} alt="Логотип" />
        </Link>
      </div>
      <div className="header__cart">
        <Link to="/cart">
          <img src={cartImg} alt="корзина" />
        </Link>
        <p className="header__cart-count">{cartCount > 0 && cartCount}</p>
      </div>
      <div className="header__favorites">
        <Link to="/favorites">
          <HandySvg src={star} />
        </Link>
        <p className="header__favorites-count">
          {favoritesCount > 0 && favoritesCount}
        </p>
      </div>
    </div>
  );
};
