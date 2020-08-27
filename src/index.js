import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MapRoute from './routes/MapRoute'
import routes from './routes/routes'
import './utils/fontsize.js'
import './assets/css/public.css'
import http from './http/index'
import './assets/font/iconfont.css'

React.Component.prototype.$http = http

ReactDOM.render(
  <BrowserRouter>
    <MapRoute routes={routes} />
  </BrowserRouter>
  ,document.getElementById('root')
);

