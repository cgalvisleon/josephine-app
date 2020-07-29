import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/bootstrap/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//serviceWorker.register({ strategies: 'networkFirst' });
serviceWorker.unregister();
