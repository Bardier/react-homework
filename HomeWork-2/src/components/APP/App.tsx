import "./App.scss";

import { Component, ReactNode } from "react";
import Modal from "../Modal/Modal";
import Portal from "../Portal/Portal";
import { getGoods } from "../../helpers";
import GoodsPage from "../../pages/GoodsPage";
import { IGoods } from "../../models";
import Header from "../Header/Header";

interface AppState {
  buyModal: boolean;
  goods: IGoods[];
  newGoods: IGoods | null;
  cart: IGoods[];
  favorites: IGoods[];
}

export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    buyModal: false,
    goods: [],
    newGoods: null,
    cart: [],
    favorites: [],
  };

  // * ------------------------------------------------------------
  // * Жизненные циклы
  // * ------------------------------------------------------------

  componentDidMount() {
    getGoods("./data.json").then((goods) => {
      this.setState({ goods });
    });

    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.setState({ cart: localCart });

    const localFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    this.setState({ favorites: localFavorites });
  }

  // * ------------------------------------------------------------
  // * Модальные окна
  // * ------------------------------------------------------------

  openBuyModal = () => {
    document.body.classList.add("open-modal");

    this.setState({ buyModal: true });
  };

  closeModals = () => {
    document.body.classList.remove("open-modal");
    this.setState({
      buyModal: false,
    });
  };

  // * ------------------------------------------------------------
  // * Методы компонента
  // * ------------------------------------------------------------

  addToCart = (newGoods: IGoods) => {
    this.openBuyModal();
    this.setState({ newGoods });
  };

  confirmAddToCart = () => {
    const { newGoods } = this.state;

    if (newGoods) {
      const localCart = [...this.state.cart, newGoods];
      localStorage.setItem("cart", JSON.stringify(localCart));

      this.setState(({ cart }) => ({
        cart: [...cart, newGoods],
        newGoods: null,
      }));
    }
  };

  setFavorites = (newFavorite: IGoods) => {
    const data = this.state.favorites.filter(({ id }) => id !== newFavorite.id);
    if (data.length !== this.state.favorites.length) {
      localStorage.setItem("favorites", JSON.stringify(data));
      this.setState({ favorites: data });
      return;
    }

    const localFavorites = [...this.state.favorites, newFavorite];
    localStorage.setItem("favorites", JSON.stringify(localFavorites));
    this.setState({ favorites: localFavorites });
  };

  // * ------------------------------------------------------------
  // * Render
  // * ------------------------------------------------------------

  render(): ReactNode {
    const { buyModal, goods, cart, newGoods, favorites } = this.state;

    return (
      <div className="app">
        <Header cartCount={cart.length} favoriteCount={favorites.length} />
        <GoodsPage
          goods={goods}
          addToCart={this.addToCart}
          setFavorites={this.setFavorites}
        />
        <Portal>
          {buyModal && (
            <Modal
              closeButton={true}
              header="Подтвердите покупку"
              closeModal={this.closeModals}
              confirmBtn={this.confirmAddToCart}
              text={newGoods?.name}
            />
          )}
        </Portal>
      </div>
    );
  }
}
