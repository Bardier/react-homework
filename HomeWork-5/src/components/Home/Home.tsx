import {FC} from "react";
import {useAppSelector} from "../../hooks/storeHooks";
import {Goods} from "../Goods/Goods";

import "./Home.scss";

export const Home: FC = () => {
  const { loading, error, goods } = useAppSelector((state) => state.goods);

  const renderGoods = goods.map((goods) => (
    <Goods goods={goods} key={goods.id} />
  ));

  return (
    <div className="home">
      <h1 className="page-title">Main page</h1>
      {loading && <div className="store-message">Loading...</div>}
      {error && <div className="store-message">{error}</div>}
      <ul className="goods-list">{renderGoods}</ul>
    </div>
  );
};
