import { FC } from "react";
import { useAppSelector } from "../../hooks/storeHooks";
import { Goods } from "../Goods/Goods";

interface IProps {}

export const Cart: FC<IProps> = ({}) => {
  const cartList = useAppSelector((state) => state.cart.cart);

  const cartRender = cartList.map((goods) => (
    <Goods goods={goods} key={goods.id} btnDelete={true} />
  ));

  return (
    <>
      <h1 className="page-title">Cart page</h1>
      <ul className="goods-list">{cartRender}</ul>
    </>
  );
};
