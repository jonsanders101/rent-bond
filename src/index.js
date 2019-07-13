import '@babel/polyfill';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import './assets/root-style.less';
import Routes from './components/Routes.js';

render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById('app')
);
