import React from "react";
import { Redirect } from "react-router-dom";
import "../styles/signin.scss";
import { Loading, genId, UnSubscribe, Subscribe, ShowDanger, App } from "../components/utilities";
import TopBar from "../components/topbar";
import BottomBar from "../components/bottombar";
import { Actions as Sistem } from "../services/actions/sistem";
import { connect } from "react-redux";
import { QRCode } from "react-qr-svg";

class Match360 extends React.Component {
  constructor(props) {
    super(props);
    Loading();
    this.state = {
      _id: "",
      host: App.host,
      app: App.app
    };
  }

  eventSession = e => {
    Sistem.match360(e).catch(() => {
      ShowDanger("¡Error del sistema!");
    });
  };

  handleData = () => {
    this.setState({
      _id: genId()
    });
  };

  componentDidMount() {
    this.handleData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState._id !== this.state._id) {
      console.log(this.state);
      UnSubscribe(`match360/${prevState._id}`, event => this.eventSession(event));
      Subscribe(`match360/${this.state._id}`, event => this.eventSession(event));
    }
  }

  componentWillUnmount() {
    UnSubscribe(`match360/${this.state._id}`, event => this.eventSession(event));
  }

  render() {
    if (this.props.sistem.signin) {
      return <Redirect to="/inboxes" push={true} />;
    }
    return (
      <React.Fragment>
        <TopBar />
        <div className="container-fluid">
          <div className="signinColumns">
            <div className="row">
              <div className="col-sm-6 col-md-7 s">
                <div className="card border-0 w">
                  <div className="card-body signin dark">
                    <h2 className="card-title">Para iniciar sesion con Mach360:</h2>
                    <ol>
                      <li>Abre la app en tu celular</li>
                      <li>Toma el menú y selecciona scanear Qr</li>
                      <li>Cuando se active la cámara, apunta tu telefono hacia esta pantalla para escanear el código</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-5">
                <div className="card w">
                  <div className="card-body signin">
                    <QRCode bgColor="#FFFFFF" fgColor="#343a40" level="H" style={{ width: "100%" }} value={JSON.stringify(this.state)} />
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

export default connect(mapStateToProps)(Match360);
