import React from "react";
import { Link } from "react-router-dom";

function TopBar(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="navbar-brand">
          <Link to="/" className="title">
            <img src="./logoWhite.svg" className="d-inline-block align-top logo" alt="" />
          </Link>
        </div>
        <Link className="btn btn-primary btn-sm" to="/">
          Regresar
        </Link>
      </nav>
    </React.Fragment>
  );
}

export default TopBar;
