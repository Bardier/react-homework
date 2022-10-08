import { Component, ReactNode } from "react";
import Button from "../Button/Button";

import "./Modal.scss";

interface ModalProps {
  header: string;
  closeButton: boolean;
  text: string;
  closeModal: () => void;
}

export default class Modal extends Component<ModalProps> {
  render(): ReactNode {
    const { closeButton, header, text, closeModal } = this.props;

    return (
      <div className="modal" onClick={closeModal}>
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <p className="modal__header">{header}</p>
          <p className="modal__text">{text}</p>
          <div className="modal__btn-wrapper">
            <Button
              bgColor="#b3382c"
              onClick={() => console.log("Ok")}
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
  }
}
