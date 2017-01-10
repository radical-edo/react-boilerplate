'use strict';
import { TOKEN_ID } from './constants';
import { Config, ErrorResponse } from 'browser-resource';

import { getMe } from './actions/me';

var isLoggedIn = false;

export function authorize(store) {
  return function (nextState, replace, done) {
    const { pathname } = nextState.location;
    const access_token = localStorage.getItem(TOKEN_ID);
    if (true === isLoggedIn) {
      return done();
    }
    if ('/sign_in' == pathname) {
      return done();
    }
    if (!!access_token) {
      Config(function (config) {
        config.headers.push(['Authorization', `Bearer/${access_token}`]);
      });
      getMe(store.dispatch)().then(function () {
        isLoggedIn = true;
        done();
        return null;
      }).catch(ErrorResponse, function () {
        replace('/sign_in');
        localStorage.removeItem(TOKEN_ID);
        done();
        return null;
      });
    } else {
      replace('/sign_in');
      return done();
    }
  };
};
