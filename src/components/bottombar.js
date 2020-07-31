import React from "react";
import { Link } from "react-router-dom";
import { App } from "./utilities";

function BottomBar(props) {
  return (
    <React.Fragment>
      <div className="row s">
        <div className="col-7 small">
          <Link className="pointer" target="_blank" to="/terms">
            Términos de uso
          </Link>
          <span className="pipe">|</span>
          <Link className="pointer" target="_blank" to="/politics">
            Política de privacidad
          </Link>
        </div>
        <div className="col-5 text-right small">
          {App.copyright} {App.company}. - V{App.version} {App.production ? "" : "Desarrollo"}
        </div>
      </div>
      <div className="row -s">
        <div className="col-12">
          <small>
            {App.copyright} {App.company}. - V{App.version}
          </small>
          <ul className="list-unstyled">
            <li>
              <Link className="pointer small" target="_blank" to="/terms">
                Términos de uso
              </Link>
            </li>
            <li>
              <Link className="pointer small" target="_blank" to="/politics">
                Politica de privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BottomBar;
