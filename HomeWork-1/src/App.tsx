import { Component, ReactNode } from "react";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Portal from "./components/Portal/Portal";

interface AppState {
  showModal1: boolean;
  showModal2: boolean;
}

export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    showModal1: false,
    showModal2: false,
  };

  openModal = (id: number) => {
    switch (id) {
      case 1:
        this.setState({ showModal1: true });
        break;
      case 2:
        this.setState({ showModal2: true });
        break;
    }
  };

  closeModal = () => {
    this.setState({
      showModal1: false,
      showModal2: false,
    });
  };

  render(): ReactNode {
    const { showModal1, showModal2 } = this.state;

    return (
      <div
        className="App"
        style={{
          paddingTop: "40px",
          textAlign: "center",
        }}
      >
        <Button
          bgColor="red"
          onClick={() => this.openModal(1)}
          text="Open first modal"
        />
        <Button
          bgColor="blue"
          onClick={() => this.openModal(2)}
          text="Open second modal"
        />
        <Portal>
          {showModal1 && (
            <Modal
              closeButton={true}
              header="Модальное окно 1"
              text="Кнопки мають бути різних кольорів"
              closeModal={this.closeModal}
            />
          )}
          {showModal2 && (
            <Modal
              closeButton={false}
              header="Модальное окно 2"
              text="По кліку на кожну з кнопок має відкриватись відповідне модальне вікно."
              closeModal={this.closeModal}
            />
          )}
        </Portal>
      </div>
    );
  }
}
