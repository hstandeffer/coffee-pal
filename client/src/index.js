import React from 'react';
import ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';

ReactDOM.render(<HelmetProvider><App /></HelmetProvider>, document.getElementById('root'));

serviceWorker.register();
