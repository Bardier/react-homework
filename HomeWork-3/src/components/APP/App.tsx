import { FC, useState, useEffect } from "react";
import { Portal } from "../Portal/Portal";
import { Modal } from "../Modal/Modal";
import { IGoods } from "../../models";
import { getGoods } from "../../helpers";

import { GoodsPage } from "../../pages/GoodsPage";
import { Header } from "../Header/Header";

import "./App.scss";

export const App: FC = () => {
  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [goods, setGoods] = useState<IGoods[]>([]);
  const [newGoods, setNewGoods] = useState<IGoods | null>(null);
  const [cart, setCart] = useState<IGoods[]>([]);
  const [favorites, setFavorites] = useState<IGoods[]>([]);

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

  const closeModals = () => {
    document.body.classList.remove("open-modal");
    setBuyModal(false);
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
      const localCart = [...cart, newGoods];
      localStorage.setItem("cart", JSON.stringify(localCart));

      setCart([...cart, newGoods]);
      setNewGoods(null);
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
      <GoodsPage
        goods={goods}
        addToCart={addToCart}
        addToFavorites={addToFavorites}
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
      </Portal>
    </div>
  );
};
