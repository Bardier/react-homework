import { FC } from "react";
import { Button } from "../Button/Button";

import "./Modal.scss";

interface IProps {
  header: string;
  closeButton: boolean;
  text?: string;
  closeModal: () => void;
  confirmBtn: () => void;
}

export const Modal: FC<IProps> = ({
  closeButton,
  header,
  text,
  closeModal,
  confirmBtn,
}) => {
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <p className="modal__header">{header}</p>
        <p className="modal__text">{text}</p>
        <div className="modal__btn-wrapper">
          <Button
            bgColor="#b3382c"
            onClick={() => {
              confirmBtn();
              closeModal();
            }}
            text="Ok"
          />
          <Button
            bgColor="#b3382c"
            onClick={() => {
              console.log("Cancel");
              closeModal();
            }}
            text="Cancel"
          />
        </div>
        {closeButton && (
          <button className="modal__btn-close" onClick={closeModal}></button>
        )}
      </div>
    </div>
  );
};
