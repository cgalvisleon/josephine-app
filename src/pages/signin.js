import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/signin.scss";
import { Loading, ShowAlert, setSessionVar, ShowDanger, getValue, focus } from "../components/utilities";
import TopBar from "../components/topbar";
import BottomBar from "../components/bottombar";
import { Api as Authentication } from "../api/authentication";
import { connect } from "react-redux";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    const _id = this.props.location.pathname;
    this.state = {
      _id: _id,
      passwordHidden: true,
      signin: false,
      data: {
        username: "",
        password: ""
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

  handleTogglePassword = () => {
    this.setState({
      passwordHidden: !this.state.passwordHidden
    });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleSignin();
    }
  };

  handleSignin = () => {
    if (this.state.username === "") {
      ShowAlert("¡Nombre usuario requerido!");
      focus("username");
    } else if (this.state.password === "") {
      ShowAlert("¡Contraseña requerida!");
      focus("password");
    } else {
      Authentication.signIn(this.state.data.username, this.state.data.password)
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
        .catch(() => {
          ShowDanger("¡Error del sistema!");
        });
    }
  };

  handleData = () => {
    this.setState({
      data: {
        username: "",
        password: ""
      }
    });
  };

  componentDidMount() {
    this.handleData();
  }

  render() {
    if (this.props.signin) {
      return <Redirect to="/inboxes" push={true} />;
    }
    return (
      <React.Fragment>
        <TopBar />
        <div className="container-fluid">
          <div className="signinColumns">
            <div className="row">
              <div className="col-sm-6 col-md-6 s">
                <div className="card border-0 w">
                  <div className="card-body signin dark">
                    <h2 className="card-title">Bienvenido</h2>
                    <p className="card-text">Conoce lo que tenemos para ayudarte a gestionar el mantenimiento de tus activos.</p>
                    <img src="Logos_Dploy-01.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="card w">
                  <div className="card-body signin">
                    <div className="row">
                      <h4 className="col-12 text-center p-1">Iniciar sesión</h4>
                    </div>
                    <div className="form-group row mb-2">
                      <label className="col-sm-4 col-form-label pr-1">Usuario</label>
                      <div className="col-sm-8 input-group-sm">
                        <input
                          type="text"
                          className="form-control"
                          autoComplete="nope"
                          placeholder="Correo o número celular"
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
                          onKeyDown={this.handleKeyDown}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text pointer eye" onClick={() => this.handleTogglePassword()}>
                            <i className={this.state.passwordHidden ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-sm btn-block mb-1" onClick={() => this.handleSignin()}>
                        Iniciar sesión
                      </button>
                      <Link className="small" to="/forgot">
                        ¿Olvidáste tu contraseña?
                      </Link>
                      <hr className="mt-2 mb-2"></hr>
                      <p className="text-center mb-2">¿Aún no tienes una cuenta?</p>
                      <Link className="btn btn-outline-secondary btn-sm btn-block mb-2" to="/register">
                        Registrate
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <BottomBar />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Signin);
