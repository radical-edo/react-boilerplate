import { isFunction } from 'lodash';
import { Config } from 'browser-resource';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import { authorize } from './authorize';
import { reducer } from './reducers';
import { HomePage, SignInPage } from './pages';
import { PageLayout } from './layout';

Config(function (config) {
  config.namespace = '/api/v1';
});

const applyDevTools = function applyDevTools(inDevelopment) {
  const { __REDUX_DEVTOOLS_EXTENSION__: devTools } = window;
  if (true === inDevelopment && isFunction(devTools)) {
    return devTools();
  } else {
    return undefined; // need to return undefined for the "createStore" not to raise any errors
  }
};

const store = createStore(reducer, applyDevTools('development' === NODE_ENV));
render((
  <Provider store={store}>
   <Router history={browserHistory}>
      <Route path="/" onEnter={authorize(store)} component={PageLayout}>
        <IndexRoute component={HomePage} />
        <Route path="sign_in" component={SignInPage} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
