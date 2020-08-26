import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { Loading, showModal, hideModal, projectId, setFocus, getValue, genId } from "../components/utilities";
import ModalHeader from "../components/modalHeader";
import { Typehead, SelectType } from "../components/inputs";
import { ApiTypehead } from "../api/typehead";
import { Api as Project } from "../api/project";
import ModalFooter from "../components/modalFooter";

class ModalUser extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const data = this.handleScheme();
    this.state = {
      _id: "__modalUser",
      title: "Usuario",
      show: false,
      old: data,
      data: data,
      change: false
    };
  }

  handleScheme = e => {
    return {
      project_id: projectId(),
      _class: "USER",
      _state: "0",
      _id: genId("-1"),
      username: "",
      caption: "",
      email: "",
      phone: "",
      profile_tp: "PROFILE-DIRECTORS",
      description: ""
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

  handleSelect = e => {
    const oldId = this.state.data._id;
    this.setState({
      data: {
        ...this.state.data,
        _id: getValue(e, "_id", oldId),
        caption: getValue(e, "caption", ""),
        username: getValue(e, "username", "")
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
    if (this.props.isNew) {
      this.setState({ show: true, change: false });
    } else {
      const _id = getValue(this.props.data, "_id", "-1");
      if (_id !== "-1") {
        this.setState({ show: true, change: false });
      }
    }
  };

  handleClose = () => {
    if (this.state.change) {
      this.setState({ data: this.state.old, change: false });
    }
    this.handleHide();
  };

  handleOk = () => {
    if (this.state.change) {
      const id = this.state.data.project_id;
      const params = this.state.data;
      Project.setUser(id, params).then(result => {
        if (result.msg === "") {
          this.handleExecute({ data: result.data, action: "set" });
        }
      });
    } else {
      this.handleHide();
    }
  };

  handleFinish = e => {
    if (e) {
      const id = this.state.data._id;
      const project_id = this.state.data.project_id;
      Project.finishUser(id, project_id).then(result => {
        if (result.msg === "") {
          this.handleExecute({ data: this.state.data, action: "del" });
        }
      });
    }
  };

  handleSetData = e => {
    this.setState({
      old: e.data,
      data: e.data,
      isNew: e.isNew,
      change: e.change
    });
    showModal(this.state._id);
    if (e.focusInt) {
      setFocus(`${this.state._id}_caption`);
    }
  };

  handleData = focusInt => {
    const data = this.props.data;
    this.handleSetData({ data, isNew: false, change: false, focusInt });
  };

  handleNew = () => {
    const data = this.handleScheme();
    this.handleSetData({ data, isNew: true, change: true, focusInt: true });
  };

  sourceUsers = query => {
    return ApiTypehead.users(query).then(result => {
      return result;
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      if (this.props.isNew) {
        this.handleNew();
      } else {
        this.handleData(true);
      }
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
              <div className="modal-dialog xs" role="dialog">
                <div className="modal-content">
                  <ModalHeader title={this.state.title} handleClose={this.handleClose} />
                  <div className="modal-body">
                    <div className="modal-box">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group input-group-sm dropdown">
                            <label>Nombre</label>
                            <Typehead
                              id={`${this.state._id}_caption`}
                              type="texty"
                              className="form-control name"
                              placeholder="Nombre"
                              name="caption"
                              _state={this.props.isNew ? "0" : "-1"}
                              value={this.state.data.caption}
                              onChange={this.handleChange}
                              source={this.sourceUsers}
                              onSelect={this.handleSelect}
                            />
                          </div>
                          <div className="form-group input-group-sm dropdown">
                            <label>Usuario</label>
                            <Typehead
                              type="text"
                              className="form-control"
                              placeholder="Correo o número celular"
                              name="username"
                              _state={this.props.isNew ? "0" : "-1"}
                              value={this.state.data.username}
                              onChange={this.handleChange}
                              source={this.sourceUsers}
                              onSelect={this.handleSelect}
                            />
                          </div>
                          <div className="form-group input-group-sm">
                            <label>Perfil</label>
                            <SelectType
                              className="form-control"
                              name="profile_tp"
                              _state={this.state.data._state}
                              projectId={this.state.project_id}
                              _class="PROFILE_TP"
                              value={this.state.data.profile_tp}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <ModalFooter
                      single="usuario"
                      plural="el usuario"
                      _state={this.state.data._state}
                      isNew={this.props.isNew}
                      onFinish={this.handleFinish}
                      onClose={this.handleClose}
                      onOk={this.handleOk}
                    />
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

export default ModalUser;
