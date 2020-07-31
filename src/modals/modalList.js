import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, getValue, setValue } from "../components/utilities";
import ModalHeaderList from "../components/modalHeaderList";
import Td from "../components/td";

class ModalList extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const name = "ModalList";
    this.state = {
      _id: "__modalList",
      title: "ModalList",
      name: name,
      params: getValue(props, "params", {}),
      show: false
    };
    this.result = {};
  }

  handleExeute() {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(this.result);
    }
  }

  handleHide() {
    hideModal(this.state._id);
    this.setState({ show: false });
  }

  handleShow = e => {
    this.setState({ show: true });
  };

  handleClose = e => {
    this.handleHide();
  };

  handleOk = e => {
    this.result = setValue(this.result, "demo", "Ok");
    this.handleExeute();
    this.handleHide();
  };

  createList = n => {
    let items = [];

    for (let i = 0; i < n; i++) {
      items.push(
        <Td key={i} className="modalListRow" cols="45px auto 85px">
          <div className="grid-1 td">Item</div>
          <div className="grid-2 td">Nombre</div>
          <div className="grid-3 td">Cantidad</div>
        </Td>
      );
    }
    return items;
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
          <div className={this.props.className} onClick={this.handleShow} disabled={!(this.props._state === "0")}>
            {this.props.children}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className={this.props.className} onClick={this.handleShow} disabled={!(this.props._state === "0")}>
            {this.props.children}
          </div>
          {ReactDOM.createPortal(
            <div className="modal fade" id={this.state._id} role="dialog">
              <div className="modal-dialog __modalList" role="document">
                <div className="modal-content">
                  <ModalHeaderList title={this.state.title} handleClose={this.handleClose} rows={999} all={999} />
                  <div className="modal-body">
                    <div className="modalList">
                      <div className="modalListFind">
                        <div className="input-group input-group-sm grid-1">
                          <input type="text" className="form-control" autoComplete="nope" placeholder="Buscar" />
                          <div className="input-group-append">
                            <button className="btn btn-secondary">
                              <i className="fa fa-search"></i>
                            </button>
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fa fa-bars"></i>
                            </button>
                            <div className="dropdown-menu">
                              <div className="dropdown-item">Activos</div>
                              <div className="dropdown-item">Terminados</div>
                              <div role="separator" className="dropdown-divider"></div>
                              <div className="dropdown-item">Cancelados</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modalListList">
                        <div className="modalLisHeader">
                          <Td className="modalListRow" cols="45px auto 85px">
                            <div className="grid-1 th">Item</div>
                            <div className="grid-2 th">Nombre</div>
                            <div className="grid-3 th">Cantidad</div>
                          </Td>
                        </div>
                        <div className="modalListTable">{this.createList(20)}</div>
                      </div>
                      <div className="modalListSelect">
                        <div className="input-group input-group-sm grid-1">
                          <input type="text" className="form-control" autoComplete="nope" placeholder="Seleccion" readOnly={true} />
                          <div className="input-group-append">
                            <button className="btn btn-secondary">
                              <i className="fa fa-ellipsis-h"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="float-left">
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleOk}>
                        Nuevo
                      </button>
                    </div>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleClose}>
                      Cerrar
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleOk}>
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

export default ModalList;
