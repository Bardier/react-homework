import { FC } from "react";

import "./Modal.scss";

interface IProps {
  title?: string;
}

export const Modal: FC<IProps> = ({
  title = "Добавить картридж в корзину?",
}) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <div className="modal__btn-wrapper">
          <button className="btn btn--modal">Ok</button>
          <button className="btn btn--modal">Cancel</button>
        </div>
        <button className="modal__close-btn">Close</button>
      </div>
    </div>
  );
};
