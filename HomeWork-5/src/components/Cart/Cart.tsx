import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { openMakePurchaseModal } from "../../store/modal/modalSlice";
import { Button } from "../Button/Button";
import { Goods } from "../Goods/Goods";

interface IProps {}

export const Cart: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((state) => state.cart.cart);

  const cartRender = cartList.map((goods) => (
    <Goods goods={goods} key={goods.id} btnDelete={true} />
  ));

  const makePurchase = () => {
    dispatch(openMakePurchaseModal());
  };

  return (
    <>
      <h1 className="page-title">Cart page</h1>
      {cartList.length > 0 && (
        <div style={{ textAlign: "center", margin: "25px 0" }}>
          <Button
            btnText="Оформить покупку"
            btnFunction={makePurchase}
            btnClasses="btn"
          />
        </div>
      )}
      <ul className="goods-list">{cartRender}</ul>
    </>
  );
};
