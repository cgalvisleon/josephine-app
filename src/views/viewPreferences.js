import React from "react";
import { Link } from "react-router-dom";
import "../styles/view.scss";
import {
  Loading,
  getView,
  projectId,
  Emitter,
  EventUnSubscribe,
  Event,
  getDifferenceInDays,
  chart,
  setFocus
} from "../components/utilities";
import { Input, Section, Phone, City, SelectType, Button, Image } from "../components/inputs";
import { Api as Project } from "../api/project";

class ViewSettings extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__ViewSettings",
      _view: getView(),
      data: {
        _id: "-1",
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
        logo: "",
        header_foto: "",
        _data: {},
        modules: []
      },
      old: {},
      change: false
    };
  }

  eventSetProject = e => {
    if (e._id !== this.state.data._id) {
      this.handleData(e);
    }
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

  handleChangeAvatar = e => {
    const data = e.data.data;
    this.setState({
      data: {
        ...this.state.data,
        avatar: data.filepath
      }
    });
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
      Project.setProject(this.state.data._id, this.state.data).then(result => {
        this.setState({ data: result.data, change: false });
        Emitter("__profile", {});
        Emitter("__project", result.data);
      });
    }
  };

  handleData = e => {
    const id = e._id;
    Project.project(id).then(result => {
      this.setState({ data: result.data, old: result.data });
      setFocus(`${this.state._id}_caption`);
    });
  };

  componentDidMount() {
    Event("__project", this.eventSetProject);
    this.handleData({ _id: projectId() });
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    EventUnSubscribe("__project", this.eventSetProject);
  }

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
                        <Image
                          className="avatar"
                          _state={this.state.data._state}
                          project_id={this.state.data._id}
                          object_id={this.state.data._id}
                          main_id="AVATAR"
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
                            <div className="username">{this.state.data.address}</div>
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
                              project_id={this.state.data._id}
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
                        Modulos
                      </a>
                      <a
                        className="nav-item nav-link"
                        id={`${this.state._id}-nav-2-tab`}
                        data-toggle="tab"
                        href={`#${this.state._id}-nav-2`}
                        role="tab"
                        aria-selected="false"
                      >
                        Preferencias
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
                        {this.state.data.modules.map((item, i) => {
                          return (
                            <React.Fragment key={i}>
                              <div className="tab-item">
                                <div className="tab-item-logo">
                                  <div className="avatar">
                                    <div className="chart">{chart(item.caption, 0)}</div>
                                  </div>
                                </div>
                                <div className="tab-item-detail">
                                  <div className="name">{item.caption}</div>
                                  <div className="label">
                                    Termina en:
                                    <strong className="ml-1">{getDifferenceInDays(item, "date_end", true)}</strong>
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
                      <div className="tab-it"></div>
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

export default ViewSettings;
