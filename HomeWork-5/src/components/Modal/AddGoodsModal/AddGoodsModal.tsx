import { FC } from "react";
import { useAddGoodsInLocalStore } from "../../../hooks/appHooks";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { addGoodsToCart } from "../../../store/cart/cartSlice";
import { Button } from "../../Button/Button";

interface IProps {
  closeModal: () => void;
}

export const AddGoodsModal: FC<IProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const { title, goodsCart } = useAppSelector((state) => state.modal);
  const addGoodsInLocalStore = useAddGoodsInLocalStore();

  const addToCart = () => {
    addGoodsInLocalStore(goodsCart);
    dispatch(addGoodsToCart(goodsCart));
    closeModal();
  };

  return (
    <>
      <h2 className="modal__title">
        Добавить <span>{title}</span> в корзину?
      </h2>
      <div className="modal__btn-wrapper">
        <Button btnClasses="btn" btnFunction={addToCart} btnText="Добавить" />
        <Button btnClasses="btn" btnFunction={closeModal} btnText="Отмена" />
      </div>
      <Button
        btnFunction={closeModal}
        btnCross={true}
        btnClasses="btn btn__cross"
      />
    </>
  );
};
