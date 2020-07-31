import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/signin.scss";
import { Loading, ShowAlert, ShowDanger, setSessionVar, isSignIn, getValue, focus, validCellPhone } from "../components/utilities";
import TopBar from "../components/topbar";
import BottomBar from "../components/bottombar";
import { Api } from "../api/authentication";

class Forgot extends React.Component {
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
        code: ""
      }
    };
  }

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
    } else if (data.password === "") {
      ShowAlert("¡Contraseña requerida!");
      focus("password");
    } else if (data.password !== data.confirmation) {
      ShowAlert("Confirmación no coincide!");
      focus("confirmation");
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

  handleForgotAccount = () => {
    const data = this.state.data;
    if (data.code === "") {
      ShowAlert("Código requerido!");
      focus("code");
    } else {
      Api.forgot(data.username, data.password, data.confirmation, data.code)
        .then(result => {
          if (result.msg === "") {
            const data = getValue(result, "data", {});
            const token = getValue(data, "token", "");
            const session = getValue(data, "session", "");
            setSessionVar("token", token);
            setSessionVar("session", session);
            this.setState({ signin: true });
          } else {
            ShowDanger(result.message);
          }
        })
        .catch(err => {
          ShowDanger("¡Error del sistema!");
        });
    }
  };

  handleCancel = () => {
    this.setState({ valid: !this.state.valid });
  };

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    if (isSignIn()) {
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
                  <div className="card-body forgot dark">
                    <h2 className="card-title">Olvidaste tu contraseña</h2>
                    <p className="card-text">No te preocupes, puedes recuperarla siguiendo estos pasos.</p>
                    <p className="card-text">
                      Escribe tu usuario y la nueva contraseña, enviaremos un código a tu correo electronico o numero celular segun tu
                      usuario y podras resuperar tu acceso.
                    </p>
                    <img src="Logos_Dploy-01.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="card w">
                  <div className="card-body forgot">
                    <div className={this.state.valid ? "tab d-none" : "tab"}>
                      <div className="row">
                        <h4 className="col-12 text-center p-1">Recuperación de usuario</h4>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Usuario</label>
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
                        <h4 className="col-12 text-center p-1">Recuperación de usuario</h4>
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
                      <button className="btn btn-primary btn-sm btn-block mb-1" onClick={this.handleForgotAccount}>
                        Conifirmar y recuperar usuario
                      </button>
                      <div className="small link" onClick={this.handleValid}>
                        ¡Solicitar código nuevamente!
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

export default Forgot;
