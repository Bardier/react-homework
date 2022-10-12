import { FC } from "react";

import "./Button.scss";

interface IProps {
  bgColor: string;
  text: string;
  onClick: () => void;
}

export const Button: FC<IProps> = ({
  bgColor,
  text,
  onClick,
  ...restProps
}) => {
  return (
    <button
      className="btn"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
      {...restProps}
    >
      {text}
    </button>
  );
};
