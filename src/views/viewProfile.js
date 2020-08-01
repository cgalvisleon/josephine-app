import React from "react";
import { Link } from "react-router-dom";
import "../styles/view.scss";
import { Loading, getView, Emitter, getValue, updateList, setFocus } from "../components/utilities";
import { Phone, Section, City, SelectType, Input, Avatar, Button } from "../components/inputs";
import { Api } from "../api/profile";

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__ViewProfile",
      _view: getView(),
      data: {
        _id: "",
        _state: "0",
        username: "",
        caption: "",
        description: "",
        email: "",
        phone: "",
        cellphone: "",
        address: "",
        city_id: "-1",
        city: "",
        identification: "",
        identification_tp: "",
        identification_type: "",
        avatar: "",
        header_foto: "",
        _data: {},
        projects: []
      },
      password: {
        password: "",
        confirmation: ""
      },
      passwordHidden: true,
      confirmHidden: true,
      change: false
    };
  }

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      },
      change: true
    });
  };

  handleChangePassword = e => {
    this.setState({
      password: {
        ...this.state.password,
        [e.target.name]: e.target.value
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
      }
    });
  };

  handleTogglePassword = () => {
    this.setState({ passwordHidden: !this.state.passwordHidden });
  };

  handleToggleConfirm = () => {
    this.setState({ confirmHidden: !this.state.confirmHidden });
  };

  handleSelCity = e => {
    this.setState({
      data: {
        ...this.state.data,
        city_id: e._id,
        city: e.caption
      },
      change: true
    });
  };

  handleGoBack = () => {
    if (this.state.change) {
      this.setState({ data: this.state.old, change: false });
    }
  };

  handleSetData = () => {
    if (this.state.change) {
      Api.setProfile(this.state.data).then(result => {
        this.setState({ data: result.data, change: false });
        Emitter("__profile", {});
      });
    }
  };

  handleSetPassword = () => {
    if (this.state.change) {
      Api.setPassword(this.state.password).then(result => {
        if (result.msg === "") {
          this.setState({ password: { password: "", confirmation: "" } });
        }
      });
    }
  };

  handleUpdateProjets = e => {
    const result = updateList(this.state.data.projects, e);
    this.setState({ data: result });
  };

  handleData = e => {
    Api.profile().then(result => {
      const msg = getValue(result, "msg", "");
      if (msg !== "") {
        this.handleExit();
      } else {
        const data = getValue(result, "data", {});
        this.setState({ data: data.profile, old: data.profile });
        setFocus(`${this.state._id}_caption`);
      }
    });
  };

  componentDidMount() {
    this.handleData();
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <React.Fragment>
        <div className={this.state._id}>
          <div className="viewcontainer">
            <div className="view-box">
              <div className="view-object">
                <div className="view-detail">
                  <div className="view-detail-title">
                    <Link className="btn btn-link btn-sm float-left" to={this.state._view} onClick={this.handleGoBack}>
                      <i className="fas fa-arrow-left"></i>
                    </Link>
                    <div className="text">{this.state.data.caption}</div>
                  </div>
                  <div className="view-detail-detail">
                    <div className="view-profile">
                      <div className="view-profile-image" style={{ backgroundImage: "url('/header_one.jpg')" }} />
                      <div className="view-profile-main">
                        <Avatar
                          className="avatar"
                          project_id="-1"
                          object_id={this.state.data._id}
                          _state={this.state.data._state}
                          group_tp="-1"
                          caption="Avatar"
                          description=""
                          path={this.state.data.avatar}
                          onChange={this.handleChangeAvatar}
                        />
                        <div className="row">
                          <div className="col-sm-12 edit">
                            <Button className="btn btn-primary btn-sm float-right" onClick={this.handleSetData}>
                              Aceptar
                            </Button>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-12 basic">
                            <div className="name">{this.state.data.caption}</div>
                            <div className="username">{this.state.data.username}</div>
                          </div>
                        </div>
                      </div>
                      <div className="view-profile-detail">
                        <div className="form-group input-group-sm">
                          <label>Nombre</label>
                          <Section
                            id={`${this.state._id}_caption`}
                            type="text"
                            className="form-control"
                            placeholder="Nombre completo"
                            name="caption"
                            _state={this.state.data._state}
                            value={this.state.data.caption}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-row input-group-sm">
                          <div className="form-group col-md-6 input-group-sm">
                            <label>Numero celular</label>
                            <Phone
                              type="text"
                              className="form-control"
                              placeholder="Número celular"
                              name="cellphone"
                              _state={this.state.data._state}
                              value={this.state.data.cellphone}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6 input-group-sm">
                            <label>Teléfono</label>
                            <Phone
                              type="text"
                              className="form-control"
                              placeholder="Telefono"
                              name="phone"
                              _state={this.state.data._state}
                              value={this.state.data.phone}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="form-row input-group-sm">
                          <div className="form-group col-md-6 input-group-sm">
                            <label>Dirección</label>
                            <Section
                              type="text"
                              className="form-control"
                              placeholder="Dirección"
                              name="address"
                              _state={this.state.data._state}
                              value={this.state.data.address}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6 input-group-sm">
                            <label>Ciudad</label>
                            <City
                              type="text"
                              className="form-control"
                              classNameBtn="input-group-text"
                              placeholder="Ciudad"
                              _state={this.state.data._state}
                              value={this.state.data.city}
                              city_id={this.state.data.city_id}
                              onChange={this.handleSelCity}
                            />
                          </div>
                        </div>
                        <div className="form-row input-group-sm">
                          <div className="form-group col-md-6 input-group-sm">
                            <label>Tipo identificación</label>
                            <SelectType
                              className="custom-select"
                              name="identification_tp"
                              project_id="-1"
                              _class="IDENTIFICATION_TP"
                              _state={this.state.data._state}
                              value={this.state.data.identification_tp}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6 input-group-sm">
                            <label>Identificación</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Identificación"
                              name="identification"
                              _state={this.state.data._state}
                              value={this.state.data.identification}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="view-master">
                  <nav>
                    <div className="nav nav-tabs" role="tablist">
                      <a
                        className="nav-item nav-link active"
                        id={`${this.state._id}-nav-1-tab`}
                        data-toggle="tab"
                        href={`#${this.state._id}-nav-1`}
                        role="tab"
                        aria-selected="true"
                      >
                        Projectos
                      </a>
                      <a
                        className="nav-item nav-link"
                        id={`${this.state._id}-nav-2-tab`}
                        data-toggle="tab"
                        href={`#${this.state._id}-nav-2`}
                        role="tab"
                        aria-selected="false"
                      >
                        Contraseña
                      </a>
                    </div>
                  </nav>
                  <div className="tab-content view">
                    <div
                      className="tab-pane fade show active"
                      id={`${this.state._id}-nav-1`}
                      role="tabpanel"
                      aria-labelledby={`${this.state._id}-nav-1-tab`}
                    >
                      <div className="tab-list">
                        {this.state.data.projects.map((item, i) => {
                          return (
                            <React.Fragment key={i}>
                              <div className="tab-item">
                                <div className="tab-item-logo">
                                  <img className="avatar" src={item.logo || "/logo.svg"} alt="" />
                                </div>
                                <div className="tab-item-detail">
                                  <div className="name">{item.caption}</div>
                                  <div className="label">{item.profile}</div>
                                  <div className="label">
                                    <i className="fa fa-map-marker mr-2" />
                                    {item.address}
                                  </div>
                                  <div className="label">
                                    <i className="fas fa-mobile-alt mr-2" />
                                    {item.cellphone}
                                  </div>
                                  <div className="label">
                                    <i className="fas fa-phone-alt mr-2" />
                                    {item.phone}
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id={`${this.state._id}-nav-2`}
                      role="tabpanel"
                      aria-labelledby={`${this.state._id}-nav-2-tab`}
                    >
                      <div className="tab-group">
                        <div className="row">
                          <h5 className="col-12 text-center p-1">Cambio de contraseña</h5>
                        </div>
                        <div className="form-group row mb-2">
                          <label className="col-sm-4 col-form-label pr-1">Contraseña</label>
                          <div className="col-sm-8 input-group input-group-sm mb-1">
                            <input
                              type={this.state.passwordHidden ? "password" : "text"}
                              className="form-control"
                              autoComplete="nope"
                              placeholder="Contraseña"
                              id="password"
                              name="password"
                              value={this.state.password.password}
                              onChange={this.handleChangePassword}
                            />
                            <div className="input-group-append">
                              <span className="input-group-text pointer eye" onClick={this.handleTogglePassword}>
                                <i className={this.state.passwordHidden ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row mb-2">
                          <label className="col-sm-4 col-form-label pr-1">Confirmación</label>
                          <div className="col-sm-8 input-group input-group-sm mb-1">
                            <input
                              type={this.state.confirmHidden ? "password" : "text"}
                              className="form-control"
                              autoComplete="nope"
                              placeholder="Confirmación"
                              id="confirmation"
                              name="confirmation"
                              value={this.state.password.confirmation}
                              onChange={this.handleChangePassword}
                            />
                            <div className="input-group-append">
                              <span className="input-group-text pointer eye" onClick={this.handleToggleConfirm}>
                                <i className={this.state.confirmHidden ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button className="btn btn-primary btn-sm btn-block" onClick={this.handleSetPassword}>
                          Cambio de contraseña
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewProfile;
