import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, projectId, ShowInfo, msg, genId } from "../components/utilities";
import ModalHeader from "../components/modalHeader";
import { Button, Name } from "../components/inputs";
import ModalOptions from "./modalOptions";

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const data = this.handleScheme();
    this.state = {
      _id: "__modal",
      title: "Modal demo",
      show: false,
      old: data,
      data: data,
      change: false,
      printParams: {
        project_id: data.project_id,
        _class: data._class,
        single: true
      }
    };
  }

  handleScheme = () => {
    return {
      project_id: projectId(),
      _class: "",
      _state: "0",
      _id: genId("-1"),
      caption: "",
      description: "",
      username: ""
    };
  };

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      },
      change: true
    });
  };

  handleExecute = e => {
    if (typeof this.props.setData === "function") {
      this.props.setData(e);
    }
    this.handleHide();
  };

  handleHide = () => {
    hideModal(this.state._id);
    this.setState({ show: false });
  };

  handleShow = () => {
    if (this.props.isFind) {
      if (this.props._id !== "-1") {
        this.setState({ show: true, change: false });
      }
    } else {
      this.setState({ show: true, change: false });
    }
  };

  handleClose = () => {
    if (this.state.change) {
      this.setState({ data: this.state.old, change: false });
    }
    this.handleHide();
  };

  handleOk = e => {
    if (this.state.change) {
      /*
      const id = this.state.data.project_id;
      const params = this.state.data;
      Api.set(id, params).then(result => {
        if (result.msg === '') {
          this.handleExecute(result.data);
        }
      });*/
    } else {
      this.handleHide();
    }
  };

  handleState = e => {
    if (e) {
      /*
      const id = this.state.data._id;
      const project_id = this.state.data.project_id;
      Api.state(id, project_id).then(result => {
        if (result.msg === '') {
          this.handleExecute(result.data);
        }
      });*/
    }
  };

  handleSetData = e => {
    this.setState({
      old: e.data,
      data: e.data,
      isNew: e.isNew,
      change: e.change,
      printParams: {
        project_id: e.data.project_id,
        _class: e.data._class,
        single: true
      }
    });
    showModal(this.state._id);
  };

  handleData = () => {
    const data = this.props.data || this.handleScheme();
    this.handleSetData({ data, isNew: false, change: false });
  };

  handleNew = () => {
    const data = this.handleScheme();
    this.handleSetData({ data, isNew: true, change: true });
  };

  handleFind = id => {
    if (this.state.change) {
      ShowInfo(msg("MSG-CHANGE"));
    } else if (id !== "-1") {
      /*
      Asset.class(id, this.props.project_id).then(result => {
        if (result.msg === '') {
          const data = result.data;
          this.handleSetData({ data, isNew: false, change: false });
        } else {
          this.handleHide();
        }
      });*/
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      if (this.props.isNew) {
        this.handleNew();
      } else if (this.props.isFind) {
        this.handleFind(this.props._id);
      } else {
        this.handleData();
      }
    }
  }

  render() {
    if (!this.state.show) {
      return (
        <React.Fragment>
          <div className={this.props.className} disabled={!(this.props._state === "0")} onClick={this.handleShow}>
            {this.props.children}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className={this.props.className} disabled={!(this.props._state === "0")} onClick={this.handleShow}>
            {this.props.children}
          </div>
          {ReactDOM.createPortal(
            <div className="modal fade" id={this.state._id} role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <ModalHeader title={this.state.title} handleClose={this.handleClose} />
                  <div className="modal-body">
                    <div className="modal-box">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group input-group-sm dropdown">
                            <label>Nombre</label>
                            <Name
                              type="texty"
                              className="form-control name"
                              autoComplete="off"
                              placeholder="Nombre"
                              name="caption"
                              _state={this.state.data._state}
                              value={this.state.data.caption}
                              onChange={this.handleChange}
                            />
                          </div>
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="float-left">
                      <ModalOptions
                        className="btn btn-outline-secondary btn-sm"
                        placement="top"
                        params={{
                          title: "¿Terminar perfil?",
                          description: "¿Desea terminar el prefil del usuario? este cambio no podrá revertirse."
                        }}
                        change={true}
                        handleClose={this.handleState}
                      >
                        Terminar
                      </ModalOptions>
                    </div>
                    <Button className="btn btn-text btn-sm" onClick={this.handleClose}>
                      Close
                    </Button>
                    <Button className="btn btn-primary btn-sm" onClick={this.handleOk}>
                      Aceptar
                    </Button>
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

export default ModalDemo;
