import React from "react";
import "../styles/404.scss";
import { Loading } from "../components/utilities";

class NotProject extends React.Component {
  constructor(props) {
    super(props);
    Loading();
  }

  render() {
    return (
      <React.Fragment>
        <div className="__404Page">
          <div className="__404">
            <div className="__Nproject">No tienes proyectos asignados</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NotProject;
