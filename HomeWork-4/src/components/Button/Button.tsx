import { FC } from "react";

import "./Button.scss";

interface IProps {
  btnFunction: () => void;
  btnText?: string;
  btnClasses?: string;
  btnCross?: boolean;
}

export const Button: FC<IProps> = ({
  btnClasses,
  btnText,
  btnFunction,
  btnCross,
}) => {
  return (
    <button className={btnClasses} onClick={btnFunction}>
      {btnText && <span>{btnText}</span>}
      {btnCross && <p>X</p>}
    </button>
  );
};
