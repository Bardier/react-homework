import { FC, useState, useEffect } from "react";

import { IGoods } from "../../models";
import { MainNavigation } from "../../pages/MainNavigation";
import { Portal } from "../Portal/Portal";
import { Modal } from "../Modal/Modal";
import { getGoods } from "../../helpers";
import { Header } from "../Header/Header";

import "./App.scss";

export const App: FC = () => {
  // * ------------------------------------------------------------
  // * State
  // * ------------------------------------------------------------

  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [removeFromCartModal, setRemoveFromCartModal] =
    useState<boolean>(false);
  const [goods, setGoods] = useState<IGoods[]>([]);
  const [newGoods, setNewGoods] = useState<IGoods | null>(null);
  const [cart, setCart] = useState<IGoods[]>([]);
  const [favorites, setFavorites] = useState<IGoods[]>([]);
  const [removeGoods, setRemoveGoods] = useState<IGoods | null>(null);

  // * ------------------------------------------------------------
  // * Жизненные циклы
  // * ------------------------------------------------------------

  useEffect(() => {
    getGoods("./data.json").then((goods) => setGoods(goods));

    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(localCart);

    const localFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(localFavorites);
  }, []);

  // * ------------------------------------------------------------
  // * Модальные окна
  // * ------------------------------------------------------------

  const openBuyModal = () => {
    document.body.classList.add("open-modal");
    setBuyModal(true);
  };

  const openRemoveFromCartModal = () => {
    document.body.classList.add("open-modal");
    setRemoveFromCartModal(true);
  };

  const closeModals = () => {
    document.body.classList.remove("open-modal");
    setBuyModal(false);
    setRemoveFromCartModal(false);
  };

  // * ------------------------------------------------------------
  // * Методы компонента
  // * ------------------------------------------------------------

  const addToCart = (newGoods: IGoods) => {
    openBuyModal();
    setNewGoods(newGoods);
  };

  const confirmAddToCart = () => {
    if (newGoods) {
      const newCart = [...cart, newGoods];
      localStorage.setItem("cart", JSON.stringify(newCart));

      setCart([...cart, newGoods]);
      setNewGoods(null);
    }
  };

  const removeFromCart = (goods: IGoods) => {
    openRemoveFromCartModal();
    setRemoveGoods(goods);
  };

  const confirmRemoveFromCart = () => {
    if (removeGoods) {
      const newCart = cart.filter(({ id }) => id !== removeGoods.id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
      setRemoveGoods(null);
    }
  };

  const addToFavorites = (newFavorite: IGoods) => {
    const data = favorites.filter(({ id }) => id !== newFavorite.id);

    if (data.length !== favorites.length) {
      localStorage.setItem("favorites", JSON.stringify(data));
      setFavorites(data);
      return;
    }

    const localFavorites = [...favorites, newFavorite];
    localStorage.setItem("favorites", JSON.stringify(localFavorites));
    setFavorites(localFavorites);
  };

  // * ------------------------------------------------------------
  // * Render
  // * ------------------------------------------------------------

  return (
    <div className="app">
      <Header cartCount={cart.length} favoriteCount={favorites.length} />

      <MainNavigation
        addToCart={addToCart}
        addToFavorites={addToFavorites}
        favorites={favorites}
        goods={goods}
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <Portal>
        {buyModal && (
          <Modal
            closeButton={true}
            header="Подтвердите покупку"
            closeModal={closeModals}
            confirmBtn={confirmAddToCart}
            text={newGoods?.name}
          />
        )}
        {removeFromCartModal && (
          <Modal
            closeButton={true}
            header="Точно хотите удалить из корзины?"
            closeModal={closeModals}
            confirmBtn={confirmRemoveFromCart}
            text={removeGoods?.name}
          />
        )}
      </Portal>
    </div>
  );
};
