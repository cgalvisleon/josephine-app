import React from 'react';
import '../styles/404.scss';

class Page404 extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="__404Page">
          <div className="__404">
            <div className="__T404">404</div>
            <div className="__N404">Pagina no encontrada</div>
            <div className="__D404">
              ¡Lo lamentamos, la pagina solicitada no fue encontrada!
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Page404;
