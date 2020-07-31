import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/signin.scss";
import { Loading, ShowAlert, ShowDanger, focus } from "../components/utilities";
import TopBar from "../components/topbar";
import BottomBar from "../components/bottombar";
import { Api } from "../api/authentication";

class Issues extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      passwordHidden: true,
      confirmHidden: true,
      signin: false,
      data: {
        username: "",
        access: false,
        use: false
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
    } else {
      Api.issues(data.username, data.access, data.use)
        .then(result => {
          if (result.msg === "") {
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

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  handleData = () => {
    this.setState({
      data: {
        username: "",
        access: false,
        use: false
      }
    });
  };

  componentDidMount() {
    this.handleData();
  }

  render() {
    if (this.state.signin) {
      return <Redirect to="/inboxes" push={false} />;
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
                    <h2 className="card-title">Bienvenido</h2>
                    <p className="card-text">
                      Como usuario tienes <strong>derechos</strong>, este espacio te permite reportar el uso inapropiado de tu información y
                      solicitar la revisión del acceso indebido, el uso de tus datos.
                    </p>

                    <img src="Logos_Dploy-01.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="card w">
                  <div className="card-body forgot">
                    <div className="tab">
                      <div className="row">
                        <h4 className="col-12 text-center p-1">Reporte de acceso indebido</h4>
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
                      <div className="form-group mb-2 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                          name="access"
                          value={this.state.data.access}
                          onChange={this.handleChange}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                          Reportar acceso indebido
                        </label>
                      </div>
                      <div className="form-group mb-4 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck2"
                          name="use"
                          value={this.state.data.use}
                          onChange={this.handleChange}
                        />
                        <label className="form-check-label" htmlFor="exampleCheck2">
                          Reportar uso indebido de tus datos
                        </label>
                      </div>

                      <button className="btn btn-primary btn-sm btn-block mb-1" onClick={this.handleValid}>
                        Solicitar revisión
                      </button>
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
                      <Link className="btn btn-outline-secondary btn-sm btn-block mb-2" to="/signin">
                        Iniciar sesión
                      </Link>
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

export default Issues;
