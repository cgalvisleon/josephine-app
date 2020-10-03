import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/signin.scss";
import { Loading, ShowAlert, ShowDanger, focus, validCellPhone, validEmail } from "../components/utilities";
import TopBar from "../components/topbar";
import BottomBar from "../components/bottombar";
import { Api } from "../services/authentication";
import { City, SelectType } from "../components/inputs";
import { Actions as Sistem } from "../services/actions/sistem";
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      passwordHidden: true,
      confirmHidden: true,
      valid: false,
      signin: false,
      data: {
        username: "",
        password: "",
        confirmation: "",
        caption: "",
        project: "",
        module_id: "-1",
        city_id: "11001",
        city: "Bogota, D.C.",
        code: ""
      }
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

  handleSelCity = e => {
    this.setState({
      data: {
        ...this.state.data,
        city_id: e._id,
        city: e.caption
      }
    });
  };

  handleTogglePassword = () => {
    this.setState({ passwordHidden: !this.state.passwordHidden });
  };

  handleToggleConfirm = () => {
    this.setState({ confirmHidden: !this.state.confirmHidden });
  };

  handleValid = () => {
    const data = this.state.data;
    if (data.username === "") {
      ShowAlert("¡Nombre usuario requerido!");
      focus("username");
    } else if (!validEmail(data.username) && !validCellPhone(data.username)) {
      ShowAlert("¡Nombre usuario no es valido!");
      focus("username");
    } else if (data.password === "") {
      ShowAlert("¡Contraseña requerida!");
      focus("password");
    } else if (data.password !== data.confirmation) {
      ShowAlert("Confirmación no coincide!");
      focus("confirmation");
    } else if (data.password.length < 8) {
      ShowAlert("Tamaño de la contraseña debe ser mayor de 8 caracteres!");
      focus("confirmation");
    } else if (data.caption === "") {
      ShowAlert("¡Nombre requerido!");
      focus("caption");
    } else if (data.project === "") {
      ShowAlert("¡Nombre de projecto requerido!");
      focus("project");
    } else if (data.module_id === "-1") {
      ShowAlert("Módulo requerido!");
      focus("module_id");
    } else if (data.city_id === "") {
      ShowAlert("Ciudad requerida!");
      focus("city_id");
    } else {
      Api.validUser(data.username)
        .then(result => {
          if (result.msg === "") {
            this.setState({ valid: true });
          } else {
            ShowDanger(result.message);
          }
        })
        .catch(() => {
          ShowDanger("¡Error del sistema!");
        });
    }
  };

  handleCreateAccount = () => {
    const data = this.state.data;
    if (data.code === "") {
      ShowAlert("Código requerido!");
      focus("code");
    } else {
      Sistem.signup(
        data.username,
        data.password,
        data.confirmation,
        data.caption,
        data.project,
        data.module_id,
        data.city_id,
        data.code
      ).catch(err => {
        ShowDanger("¡Error del sistema!");
      });
    }
  };

  handleCancel = () => {
    this.setState({ valid: !this.state.valid });
  };

  handleData = () => {
    this.setState({
      data: {
        username: "",
        password: "",
        confirmation: "",
        caption: "",
        project: "",
        module_id: "-1",
        city_id: "11001",
        city: "Bogota, D.C.",
        code: ""
      }
    });
  };

  componentDidMount() {
    this.handleData();
  }

  render() {
    if (this.props.sistem.signin) {
      return <Redirect to="/inboxes" push={true} />;
    }
    return (
      <React.Fragment>
        <TopBar></TopBar>
        <div className="container-fluid">
          <div className="signinColumns">
            <div className="row">
              <div className="col-sm-6 col-md-6 s">
                <div className="card border-0 w">
                  <div className="card-body register dark">
                    <h2 className="card-title">Sistemas de mantenimiento y gestión de activos</h2>
                    <p className="card-text">
                      <b>Bienvenido</b>, te damos 30 días para que pruebes nuestros productos; <b>Ilumina</b> (Alumbrado público) y{" "}
                      <b>Redis</b> (Redes de distribución eléctrica) y conozcas lo que tenemos para ayudarte a gestionar el mantenimiento de
                      tus activos.
                    </p>
                    <img src="Logos_Dploy-01.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="card w">
                  <div className="card-body register">
                    <div className={this.state.valid ? "tab d-none" : "tab"}>
                      <div className="row">
                        <h4 className="col-12 text-center p-1">Crear cuenta</h4>
                      </div>
                      <div className="form-group row mb-2">
                        <label className="col-sm-4 col-form-label pr-1">Usuario</label>
                        <div className="col-sm-8 input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="nope"
                            placeholder="Número celular o correo"
                            id="username"
                            name="username"
                            value={this.state.data.username}
                            onChange={this.handleChange}
                          />
                        </div>
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
                            value={this.state.data.password}
                            onChange={this.handleChange}
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
                            value={this.state.data.confirmation}
                            onChange={this.handleChange}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text pointer eye" onClick={this.handleToggleConfirm}>
                              <i className={this.state.confirmHidden ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr className="mb-2 mt-2"></hr>
                      <div className="form-group row mb-2">
                        <label className="col-sm-4 col-form-label pr-1">Nombre</label>
                        <div className="col-sm-8 input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="nope"
                            placeholder="Nombre completo"
                            id="caption"
                            name="caption"
                            value={this.state.data.caption}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-2">
                        <label className="col-sm-4 col-form-label pr-1">Proyecto</label>
                        <div className="col-sm-8 input-group-sm">
                          <input
                            type="text"
                            className="form-control"
                            autoComplete="nope"
                            placeholder="Nombre del proyecto"
                            id="project"
                            name="project"
                            value={this.state.data.project}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-2">
                        <label className="col-sm-4 col-form-label pr-1">Módulo</label>
                        <div className="col-sm-8 input-group-sm">
                          <SelectType
                            className="form-control"
                            name="module_id"
                            _state="0"
                            _class="MODULE"
                            value={this.state.data.module_id}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="form-group row mb-2">
                        <label className="col-sm-4 col-form-label pr-1">Ciudad</label>
                        <div className="col-sm-8 mb-1">
                          <City
                            type="text"
                            className="form-control"
                            classNameBtn="input-group-text"
                            _state="0"
                            value={this.state.data.city}
                            city_id={this.state.data.city_id}
                            onChange={this.handleSelCity}
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm btn-block" onClick={this.handleValid}>
                        Validar cuenta
                      </button>
                      <hr className="mb-2 mt-2"></hr>
                      <p className="text-center mb-2">¿Tienes una cuenta?</p>
                      <Link className="btn btn-outline-secondary btn-sm btn-block mb-2" to="/signin">
                        Iniciar sesión
                      </Link>
                    </div>
                    <div className={this.state.valid ? "tab" : "tab d-none"}>
                      <div className="row">
                        <h4 className="col-12 text-center p-1">Crear cuenta</h4>
                      </div>
                      <p className="text-center">
                        Enviamos un codigo de 6 digitos a tu{" "}
                        {validCellPhone(this.state.data.username) ? "número celular" : "correo electronico"}, como metodo de validación de
                        tu cuenta
                      </p>
                      <div className="form-group row mb-2">
                        <label className="col-sm-3 col-form-label">Código</label>
                        <div className="col-sm-6 input-group-sm">
                          <input
                            type="text"
                            className="form-control text-center"
                            autoComplete="nope"
                            placeholder="Código de validación"
                            id="code"
                            name="code"
                            value={this.state.data.code}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm btn-block mb-1" onClick={this.handleCreateAccount}>
                        Conifirmar y crear usuario
                      </button>
                      <div className="small link mb-4" onClick={this.handleValid}>
                        ¡Solicitar código nuevamente!
                      </div>
                      <div>
                        Al continuar, declaras que aceptas los{" "}
                        <Link className="pointer" target="_blank" to="/terms">
                          Términos de uso
                        </Link>
                        , la{" "}
                        <Link className="pointer" target="_blank" to="/politics">
                          Política de privacidad
                        </Link>
                      </div>
                      <hr className="mb-2 mt-2"></hr>
                      <p className="text-center mb-2">¿Tienes una cuenta?</p>
                      <button className="btn btn-outline-secondary btn-sm btn-block mb-2" onClick={this.handleCancel}>
                        Cancelar confirmación
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <BottomBar></BottomBar>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Register);
