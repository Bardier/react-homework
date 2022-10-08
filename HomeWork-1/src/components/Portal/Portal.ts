import { Component, ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

export default class Portal extends Component<PortalProps> {
  render(): ReactNode {
    return ReactDOM.createPortal(this.props.children, document.body);
  }
}
