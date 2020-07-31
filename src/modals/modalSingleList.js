import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, getValue } from "../components/utilities";
import ModalHeaderList from "../components/modalHeaderList";

class ModalSingleList extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const name = "ModalSingleList";
    this.state = {
      _id: "__modalSingleList",
      name: name,
      params: getValue(props, "params", {}),
      show: false,
      data: {
        project_id: "-1",
        _class: "-1",
        state: "0",
        list: [],
        page: 0,
        search: "",
        rows: 0,
        all: 0
      },
      select: { _id: "", caption: "" }
    };
  }

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  handleExecute = e => {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(e);
    }
    this.handleHide();
  };

  handleHide = () => {
    hideModal(this.state._id);
    this.setState({ show: false });
  };

  handleShow = () => {
    if (this.props._state === "0") {
      this.setState({ show: true });
    }
  };

  handleClose = () => {
    this.handleHide();
  };

  handleOk = e => {
    this.handleExecute(this.state.select);
  };

  handleData = e => {
    let items = [];

    for (let i = 0; i < e; i++) {
      items.push(
        <div key={i} className="modalLisRow">
          <div className="grid-1 td">Nombre</div>
        </div>
      );
    }
    return items;
  };

  handleScrolling = e => {
    const h = e.target.scrollTop + e.target.clientHeight;
    if (e.target.id === `${this.state._id}_scroll` && h === e.target.scrollHeight) {
      this.handleData(true);
    }
  };

  handleSearch = () => {
    this.handleData(false);
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  };

  handleState = e => {
    this.setState({
      data: {
        ...this.state.data,
        state: e
      }
    });
  };

  handleSelect = e => {
    this.setState({ select: e });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScrolling, true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      this.handleData(false);
      showModal(this.state._id);
    } else if (prevState.data.state !== this.state.data.state) {
      this.handleData(false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScrolling);
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
              <div className="modal-dialog __modalSingleList" role="document">
                <div className="modal-content">
                  <ModalHeaderList title="Lista" handleClose={this.handleClose} rows={999} all={999} />
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
                      <div className="modalListLit">
                        <div className="modalListBody">{this.handleData(20)}</div>
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

export default ModalSingleList;
