import { Component, ReactNode } from "react";
import "./Button.scss";

interface ButtonProps {
  bgColor: string;
  text: string;
  onClick: () => void;
}

export default class Button extends Component<ButtonProps> {
  render(): ReactNode {
    const { bgColor, text, onClick, ...restProps } = this.props;
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
  }
}
