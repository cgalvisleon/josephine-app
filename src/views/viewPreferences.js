import React from "react";
import { Link } from "react-router-dom";
import "../styles/view.scss";
import { Loading, getDifferenceInDays, chart, setFocus } from "../components/utilities";
import { Input, Section, Phone, City, SelectType, Button, Image } from "../components/inputs";
import { Api as Project } from "../services/project";
import { Actions as Sistem } from "../services/actions/sistem";
import { connect } from "react-redux";

class ViewSettings extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "__ViewSettings",
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
        modules: [],
        vars: []
      },
      old: {},
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

  handleChangeAvatar = e => {
    const data = e.data.data;
    this.setState({
      data: {
        ...this.state.data,
        avatar: data.filepath
      }
    });
  };

  handleChangeChkModule = e => {
    const item = e.item;
    const index = e.index;
    const data = this.state.data;
    const project_id = data._id;
    const modules = this.state.data.modules;
    item.chk = !item.chk;
    Project.chkModules(project_id, item._id, item.chk).then(result => {
      modules[index] = result.data;
      data.modules = modules;
      this.setState({
        data: {
          ...this.state.data,
          modules: modules
        }
      });
    });
  };

  handleChangeVar = e => {
    const data = this.state.data;
    const vars = data.vars;
    const item = e.item;
    const index = e.index;
    if (item.value === "TRUE") {
      item.value = "FALSE";
    } else {
      item.value = "TRUE";
    }
    vars[index] = item;
    data.vars = vars;
    this.setState({
      data: data,
      change: true
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
        this.setState({
          data: result.data,
          change: false
        });
        Sistem.setProject(result.data);
      });
    }
  };

  handleData = () => {
    const id = this.props.project_id;
    Project.project(id).then(result => {
      this.setState({
        data: result.data,
        old: result.data
      });
      setFocus(`${this.state._id}_caption`);
    });
  };

  handleModule = module => {
    const modules = this.props.project.modules || [];
    const index = modules.findIndex(element => element._id === module && element.chk === true);
    return index > -1;
  };

  componentDidMount() {
    this.handleData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project_id !== this.props.project_id) {
      this.handleData();
    }
  }

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
                    <Link className="btn btn-link btn-sm float-left" to={this.props._view} onClick={this.handleGoBack}>
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
                            <Button className="btn btn-primary btn-sm float-right" onClick={() => this.handleSetData()}>
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
                              placeholder="N??mero celular"
                              name="cellphone"
                              _state={this.state.data._state}
                              value={this.state.data.cellphone}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group col-md-6 input-group-sm">
                            <label>Tel??fono</label>
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
                            <label>Direcci??n</label>
                            <Section
                              type="text"
                              className="form-control"
                              placeholder="Direcci??n"
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
                            <label>Tipo identificaci??n</label>
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
                            <label>Identificaci??n</label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Identificaci??n"
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
                                  <div className="custom-control custom-switch pointer">
                                    <input
                                      className="custom-control-input"
                                      type="checkbox"
                                      id={`${item._id}_CheckboxRural`}
                                      name="chk"
                                      checked={item.chk}
                                      onChange={() => this.handleChangeChkModule({ item, index: i })}
                                    />
                                    <label className="custom-control-label custom-label pt-0 pl-1" htmlFor={`${item._id}_CheckboxRural`}>
                                      Termina en
                                      <strong className="ml-1">{getDifferenceInDays(item, "date_end", true)}</strong>
                                    </label>
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
                        <div
                          className={this.handleModule("MODULE-ILUMINA") ? "pb-2" : this.handleModule("MODULE-REDIST") ? "pb-2" : "d-none"}
                        ></div>
                        <div className="tab-group row pl-0 pr-0 border-top">
                          <div className="form-group col-sm-12 mb-0">
                            {this.state.data.vars.map((item, index) => {
                              return (
                                <div key={index} className="custom-control custom-switch pointer">
                                  <input
                                    className="custom-control-input"
                                    type="checkbox"
                                    id={`CheckboxVar${index}`}
                                    name="controlConsumptions"
                                    checked={item.value === "TRUE"}
                                    onChange={() => this.handleChangeVar({ item, index })}
                                  />
                                  <label className="custom-control-label custom-label pt-0 pl-1" htmlFor={`CheckboxVar${index}`}>
                                    {item.caption}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
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

function mapStateToProps(state) {
  return {
    signin: state.sistem.signin,
    project_id: state.sistem.project._id || "-1",
    project: state.sistem.project,
    user_id: state.sistem.profile._id || "-1",
    user_name: state.sistem.profile.caption || "",
    _view: state.sistem.folder._view || "",
    online: state.sistem.online
  };
}

export default connect(mapStateToProps)(ViewSettings);
