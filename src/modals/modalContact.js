import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";
import { showModal, hideModal, ShowInfo, msg, setFocus, genId, getValue } from "../components/utilities";
import { Input, Name, Section, Phone, City, Select, Avatar } from "../components/inputs";
import ModalHeader from "../components/modalHeader";
import ModalFooter from "../components/modalFooter";
import { Api as Project } from "../services/project";
import { connect } from "react-redux";

class ModalContact extends React.Component {
  constructor(props) {
    super(props);
    const data = this.handleScheme();
    this.state = {
      _id: "__modalContact",
      title: "Contacto",
      show: false,
      old: data,
      data: data,
      change: false,
      identification_tp: [
        { _id: "-1", caption: "" },
        { _id: "IDENTIFICATION_TP001", caption: "Cedula" },
        { _id: "IDENTIFICATION_TP002", caption: "Rut" },
        { _id: "IDENTIFICATION_TP003", caption: "Nit" },
        { _id: "IDENTIFICATION_TP004", caption: "Pasaporte" }
      ],
      profile_tp: [
        { _id: "CONTACT", caption: "Contacto" },
        { _id: "CLIENT", caption: "Cliente" },
        { _id: "PROVIDER", caption: "Proveedor" },
        { _id: "MANUFACTURER", caption: "Fabricante" }
      ]
    };
  }

  handleScheme = e => {
    return {
      project_id: this.props.project_id,
      _class: "CONTACT",
      _state: "0",
      _id: genId("-1"),
      username: "",
      email: "",
      phone: "",
      avatar: "",
      address: "",
      caption: "",
      country_id: "-1",
      city_id: "-1",
      city: "",
      cellphone: "",
      identification_tp: "",
      identification: "",
      profile_tp: "CONTACT",
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

  handleChangeCity = e => {
    this.setState({
      data: {
        ...this.state.data,
        city_id: e._id,
        city: e.caption
      },
      change: true
    });
  };

  handleChangeAvatar = e => {
    const data = e.data.data;
    this.setState({
      data: {
        ...this.state.data,
        avatar: data.filepath
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
      const _id = getValue(this.props, "_id", "-1");
      if (_id !== "-1") {
        this.setState({ show: true, change: false });
      }
    } else if (this.props.isNew) {
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
      const id = this.state.data._id;
      const params = this.state.data;
      Project.setContact(id, params).then(result => {
        if (result.msg === "") {
          this.handleExecute(result.data);
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
      Project.stateContact(id, project_id, "1").then(result => {
        if (result.msg === "") {
          this.handleExecute(result.data);
        }
      });
    }
  };

  handleRestore = e => {
    if (e) {
      const id = this.state.data._id;
      const project_id = this.state.data.project_id;
      Project.stateContact(id, project_id, "0").then(result => {
        if (result.msg === "") {
          this.handleExecute(result.data);
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
    setFocus(`${this.state._id}_caption`, e.focusInt);
  };

  handleData = focusInt => {
    const data = this.props.data;
    this.handleSetData({ data, isNew: false, change: false, focusInt });
  };

  handleNew = () => {
    const data = this.handleScheme();
    this.handleSetData({ data, isNew: true, change: true, focusInt: true });
  };

  handleFind = id => {
    if (this.state.change) {
      ShowInfo(msg("MSG-CHANGE"));
    } else if (id !== "-1") {
      Project.contact(id, this.props.project_id).then(result => {
        if (result.msg === "") {
          const data = result.data;
          this.handleSetData({ data, isNew: false, change: false, focusInt: true });
        }
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show !== this.state.show && this.state.show) {
      if (this.props.isNew) {
        this.handleNew();
      } else if (this.props.isFind) {
        this.handleFind(this.props._id);
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
              <div className="modal-dialog" role="dialog">
                <div className="modal-content">
                  <ModalHeader title={this.state.title} handleClose={this.handleClose} />
                  <div className="modal-body">
                    <div className="modal-box">
                      <div className="row">
                        <div className="col-4">
                          <div className="text-center">
                            <Avatar
                              className="rounded-circle img-thumbnail contact-avatar"
                              _state={this.props.isNew ? "-1" : this.state.data._state}
                              project_id={this.state.data.project_id}
                              object_id={this.state.data._id}
                              group_tp="-1"
                              caption="Avatar"
                              description=""
                              path={this.state.data.avatar}
                              onChange={this.handleChangeAvatar}
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="form-group input-group-sm">
                            <label>Nombre</label>
                            <Name
                              id={`${this.state._id}_caption`}
                              type="text"
                              className="form-control name"
                              placeholder="Nombre"
                              _state={this.state.data._state}
                              name="caption"
                              value={this.state.data.caption}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group input-group-sm">
                            <label>Tipo de identificación</label>
                            <Select
                              className="form-control"
                              _state={this.state.data._state}
                              name="identification_tp"
                              value={this.state.data.identification_tp}
                              onChange={this.handleChange}
                              list={this.state.identification_tp}
                            />
                          </div>
                          <div className="form-group input-group-sm">
                            <label>Numero identificación</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Numero identificación"
                              _state={this.state.data._state}
                              name="identification"
                              value={this.state.data.identification}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-row input-group-sm mb-0">
                            <div className="form-group col-md-7 input-group-sm mb-0">
                              <label>Numero celular</label>
                              <Phone
                                type="text"
                                className="form-control"
                                placeholder="Número celular"
                                _state={this.state.data._state}
                                name="cellphone"
                                value={this.state.data.cellphone}
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="form-group col-md-5 input-group-sm mb-0">
                              <label>Telefono</label>
                              <Phone
                                type="text"
                                className="form-control"
                                placeholder="Telefono"
                                _state={this.state.data._state}
                                name="phone"
                                value={this.state.data.phone}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="form-group input-group-sm">
                            <label>Correo electronico</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Correo electronico"
                              _state={this.state.data._state}
                              name="email"
                              value={this.state.data.email}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group input-group-sm">
                            <label>Ciudad</label>
                            <City
                              className="form-control"
                              classNameBtn="input-group-text"
                              _state={this.state.data._state}
                              value={this.state.data.city}
                              city_id={this.state.data.city_id}
                              onChange={this.handleChangeCity}
                            />
                          </div>
                          <div className="form-group input-group-sm">
                            <label>Dirección</label>
                            <Section
                              type="text"
                              className="form-control"
                              placeholder="Dirección"
                              _state={this.state.data._state}
                              name="address"
                              value={this.state.data.address}
                              onChange={this.handleChange}
                            />
                          </div>
                          <hr></hr>
                          <div className="form-group input-group-sm">
                            <label>Tipo de contacto</label>
                            <Select
                              className="form-control"
                              _state={this.state.data._state}
                              name="profile_tp"
                              value={this.state.data.profile_tp}
                              onChange={this.handleChange}
                              list={this.state.profile_tp}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <ModalFooter
                      single="contacto"
                      plural="el contacto"
                      _state={this.state.data._state}
                      isNew={this.props.isNew}
                      onFinish={this.handleFinish}
                      onRestore={this.handleRestore}
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

function mapStateToProps(state) {
  return {
    signin: state.sistem.signin,
    project_id: state.sistem.project._id || "-1",
    online: state.sistem.online
  };
}

export default connect(mapStateToProps)(ModalContact);
