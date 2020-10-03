import React from "react";
import { Link, Redirect } from "react-router-dom";
import "../styles/home.scss";
import { Navbar, Nav } from "react-bootstrap";
import { Loading, App } from "../components/utilities";
import * as Scroll from "react-scroll";
import { connect } from "react-redux";
const Anchor = Scroll.Link;
const Element = Scroll.Element;

class Home extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      description: "2020, nuestro objetivo consolidar nuestros servicios",
      products: [
        {
          _id: 1,
          name: "ilumina",
          description:
            "Herramienta de gestión que facilita el registro, organización y planeación de las actividades de mantenimiento de alumbrado público, cumpliendo con la normatividad RETILAP."
        },
        {
          _id: 2,
          name: "Redist",
          description:
            "Herramienta para la gestión de actividades de mantenimiento de redes de distribución eléctrica, mejorando la operación y calidad del servicio."
        },
        {
          _id: 3,
          name: "Match 360",
          description: "Una forma diferente de iniciar sesión, de registrar usuarios de tu sistema."
        }
      ],
      features: [
        {
          _id: 1,
          icon: "fa-rocket",
          name: "Innovación",
          description: ""
        },
        {
          _id: 2,
          icon: "fa-user-clock",
          name: "Experiencia",
          description: ""
        },
        {
          _id: 3,
          icon: "fa-handshake",
          name: "Servicio",
          description: ""
        },
        {
          _id: 4,
          icon: "fa-users",
          name: "Competitividad",
          description: ""
        },
        {
          _id: 5,
          icon: "fa-medal",
          name: "Excelencia",
          description: ""
        },
        {
          _id: 6,
          icon: "fa-cogs",
          name: "Adaptabilidad",
          description: ""
        }
      ]
    };
  }

  render() {
    if (this.props.sistem.signin) {
      return <Redirect to="/inboxes" push={true} />;
    }
    return (
      <React.Fragment>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
          <Navbar.Brand>
            <Link to="/" className="title">
              <img src="logoWhite.svg" className="d-inline-block align-top logo" alt="" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Anchor className="nav-link option" spy={true} smooth={true} to="start">
                Inicio
              </Anchor>
              <Anchor className="nav-link option" spy={true} smooth={true} to="product">
                Productos
              </Anchor>
              <Anchor className="nav-link option" spy={true} smooth={true} to="features">
                Características
              </Anchor>
              <Anchor className="nav-link option d-none" spy={true} smooth={true} to="pricing">
                Precios
              </Anchor>
            </Nav>
            <Nav>
              <Link className="btn btn-primary btn-sm" to="/signin">
                Iniciar sesión
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Element id="start" className="jumbotron">
          <div className="container">
            <h1 className="display-3">Dploy</h1>
            <p>
              Desarrollamos soluciones de software con el uso de tecnologías innovadoras, generando impacto en las necesidades de nuestros
              clientes.
            </p>
            <p>
              <Link className="btn btn-lg btn-primary" to="/register">
                Regístrate aquí &raquo;
              </Link>
            </p>
          </div>
        </Element>
        <Element id="product" className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="row">
            <div className="col-md-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">Productos</h1>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <Element id="product-ap" className="col-md-4">
                <div className="bg-dark product text-center text-white overflow-hidden">
                  <div className="product-detail">
                    <Link to="/ilumina">
                      <h2 className="display-5">{this.state.products[0].name}</h2>
                    </Link>
                    <p className="lead">{this.state.products[0].description}</p>
                  </div>
                  <Link className="btn btn-lg btn-primary product-register" to="/register">
                    Regístrate aquí &raquo;
                  </Link>
                </div>
              </Element>
              <Element id="product-re" className="col-md-4">
                <div className="bg-light product text-center overflow-hidden">
                  <div className="product-detail">
                    <Link to="/redist">
                      <h2 className="display-5">{this.state.products[1].name}</h2>
                    </Link>
                    <p className="lead">{this.state.products[1].description}</p>
                  </div>
                  <Link className="btn btn-lg btn-primary product-register" to="/register">
                    Regístrate aquí &raquo;
                  </Link>
                </div>
              </Element>
              <Element id="product-mash" className="col-md-4">
                <div className="bg-dark product text-center text-white overflow-hidden">
                  <div className="product-detail">
                    <Link to="/redist">
                      <h2 className="display-5">{this.state.products[2].name}</h2>
                    </Link>
                    <p className="lead">{this.state.products[2].description}</p>
                  </div>
                  <Link className="btn btn-lg btn-primary product-register" to="/match360">
                    Iniciar sessión &raquo;
                  </Link>
                </div>
              </Element>
            </div>
          </div>
        </Element>
        <Element id="features" className="position-relative overflow-hidden features text-center bg-light">
          <div className="row">
            <div className="col-md-5 mx-auto my-3">
              <h1 className="display-4 font-weight-normal xx-f-z">Características</h1>
            </div>
          </div>
          <div className="container">
            <Element className="row">
              {this.state.features.map((item, i) => {
                return (
                  <div key={i} className="feature col-md-4 mt-4 mb-4">
                    <i className={`fas ${item.icon} mr-2`}></i>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </Element>
          </div>
        </Element>
        <hr />
        <Element id="pricing" className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light d-none">
          <div className="row">
            <div className="col-md-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">Precios</h1>
              <p className="lead font-weight-normal">Tenemos diferentes modelos de precios, que se ajustan a tus necesidades</p>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="card-deck mb-3 text-center">
                <div className="card mb-4 shadow-sm">
                  <div className="card-header">
                    <h4 className="my-0 font-weight-normal">Gratuita</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      $0<small className="text-muted">/ mes</small>
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>30 días de prueba</li>
                      <li>Plataforma web</li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <Link className="btn btn-lg btn-block btn-primary" to="/register">
                      Regístrate, es gratis
                    </Link>
                  </div>
                </div>
                <div className="card mb-4 shadow-sm">
                  <div className="card-header">
                    <h4 className="my-0 font-weight-normal">Profesional</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      $1.8M<small className="text-muted">/ mes</small>
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>30 días de prueba</li>
                      <li>Hasta 5.000 equipos</li>
                      <li>Plataforma web</li>
                      <li>Soporte técnico</li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <Link className="btn btn-lg btn-block btn-primary" to="/register">
                      Empieza ya
                    </Link>
                  </div>
                </div>
                <div className="card mb-4 shadow-sm">
                  <div className="card-header">
                    <h4 className="my-0 font-weight-normal">Empresarial</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      Negociación<small className="text-muted"></small>
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>30 días de prueba</li>
                      <li>Sin limite de equipos</li>
                      <li>Plataforma web</li>
                      <li>Instalación in house</li>
                      <li>Soporte técnico</li>
                      <li></li>
                      <li></li>
                    </ul>
                    <Link className="btn btn-lg btn-block btn-primary" to="/register">
                      Contáctanos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Element>
        <footer className="container py-5">
          <div className="row">
            <div className="col-12 col-md mb-3">
              <img className="d-inline-block align-top logo mb-1" src="logoColor.svg" alt="" />
              <small className="d-block mb-0 text-muted">{`${App.copyright} ${App.company}`}</small>
              <small className="d-block mb-0 text-muted">{App.address}</small>
              <small className="d-block mb-0 text-muted">Versión {App.version}</small>
            </div>
            <div className="col-6 col-md">
              <Anchor smooth={true} to="product">
                <h5 className="pointer">Productos</h5>
              </Anchor>
              <ul className="list-unstyled text-small">
                {this.state.products.map((item, i) => {
                  return (
                    <li key={i}>
                      <Anchor className="text-muted pointer" smooth={true} to="product">
                        {item.name}
                      </Anchor>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-6 col-md d-none">
              <Anchor smooth={true} to="features">
                <h5 className="pointer">Características</h5>
              </Anchor>
              <ul className="list-unstyled text-small">
                {this.state.features.map((item, i) => {
                  return (
                    <li key={i}>
                      <Anchor className="text-muted pointer" to="features">
                        {item.name}
                      </Anchor>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-6 col-md">
              <h5>Recursos</h5>
              <ul className="list-unstyled text-small">
                <li>
                  <Link className="pointer" to="/terms">
                    Términos de uso
                  </Link>
                </li>
                <li>
                  <Link className="pointer" to="/politics">
                    Política de privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
