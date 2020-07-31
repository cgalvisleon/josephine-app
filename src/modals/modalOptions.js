import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, getValue } from "../components/utilities";
import { ToolTip } from "../components/inputs";
import ModalHeader from "../components/modalHeader";

class ModalOptions extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const name = "ModalOptions";
    this.state = {
      _id: "__modalOptions",
      name: name,
      params: getValue(props, "params", {
        title: "¿Guardar los cambios?",
        description: "¿Desea guardar los cambios para trabajarlo más tarde?"
      }),
      show: false
    };
  }

  handleExeute = e => {
    if (typeof this.props.onClose === "function") {
      this.props.onClose(e);
    }
  };

  handleHide() {
    hideModal(this.state._id);
    this.setState({ show: false });
  }

  handleShow = e => {
    if (this.props.change) {
      this.setState({ show: true });
    } else {
      this.handleExeute(false);
    }
  };

  handleOk = e => {
    this.handleExeute(true);
    this.handleHide();
  };

  handleToRefuse = e => {
    this.handleExeute(false);
    this.handleHide();
  };

  handleCancel = e => {
    this.handleHide();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      showModal(this.state._id);
    }
  }

  componentWillUnmount() {
    hideModal(this.state._id);
  }

  render() {
    if (!this.state.show) {
      return (
        <React.Fragment>
          <ToolTip
            className={this.props.className}
            title={this.props.title || ""}
            placement={this.props.placement}
            _state={this.props._state || "0"}
            display={this.props.display}
            onClick={this.handleShow}
          >
            {this.props.children}
          </ToolTip>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ToolTip
            className={this.props.className}
            title={this.props.title || ""}
            placement={this.props.placement}
            _state={this.props._state || "0"}
            display={this.props.display}
            onClick={this.handleShow}
          >
            {this.props.children}
          </ToolTip>
          {ReactDOM.createPortal(
            <div className="modal fade" id={this.state._id} role="dialog">
              <div className="modal-dialog __modalOption" role="document">
                <div className="modal-content">
                  <ModalHeader title={this.state.params.title} handleClose={this.handleCancel} />
                  <div className="model-body-group t-l">{this.state.params.description}</div>
                  <div className="modal-footer-group">
                    <div className="float-left">
                      <button type="button" className="btn btn-outline-secondary btn-sm btn-chrome" onClick={this.handleCancel}>
                        Cancelar
                      </button>
                    </div>
                    <button type="button" className="btn btn-outline-secondary btn-sm btn-chrome" onClick={this.handleToRefuse}>
                      Rechazar
                    </button>
                    <button type="button" className="btn btn-primary btn-sm btn-chrome" onClick={this.handleOk}>
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.getElementById("rootModals")
          )}
        </React.Fragment>
      );
    }
  }
}

export default ModalOptions;
