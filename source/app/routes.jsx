'use strict';

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Index from './components';

const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Index} />
  </Router>
);

export default Routes;
