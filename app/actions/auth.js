import { Resource, ErrorResponse } from 'browser-resource';

import { updateSession } from './session';
import { globalError } from './global_errors';
import { checkIfGlobalError, GlobalError } from '../utils';

const auth = new Resource('/auth');

export const LOGGING_OUT = 'Logging Out';
export const LOGGED_OUT = 'Logged Out';
export const NOT_LOGGED_OUT = 'Not Logged Out';
export const LOG_OUT_RESOLVED = 'Log Out Resolved';

function loggingOut() {
  return {
    type: LOGGING_OUT
  };
}

function loggedOut() {
  return {
    type: LOGGED_OUT
  };
}

function notLoggedOut(payload) {
  return {
    payload,
    type: NOT_LOGGED_OUT
  };
}

function logOutResolved() {
  return {
    type: LOG_OUT_RESOLVED
  };
}

export function logOut(dispatch) {
  return function () {
    dispatch(loggingOut());
    auth.destroy().then(function (res) {
      dispatch(loggedOut());
    }).catch(ErrorResponse, checkIfGlobalError).catch(GlobalError, globalError(dispatch))
      .catch(ErrorResponse, function (error) {
        const { err: { response } = {} } = error;
        dispatch(loggedOut()); // if user cannot log out means that his/hers token is expired,
          // hence the dispatched action
      }).then(function () {
        dispatch(logOutResolved());
        return null;
      });
  };
}

export const LOG_IN_RESOLVED = 'Log In Resolved';
export const LOGGING_IN = 'Logging In';
export const LOGGED_IN = 'Logged In';
export const NOT_LOGGED_IN = 'Not Logged In';

function logInResolved() {
  return {
    type: LOG_IN_RESOLVED
  };
}

function loggingIn() {
  return {
    type: LOGGING_IN
  };
}

function loggedIn(payload) {
  return {
    payload,
    type: LOGGED_IN
  };
}

function notLoggedIn(payload) {
  return {
    payload,
    type: NOT_LOGGED_IN
  };
}

export function logIn(dispatch) {
  return function (params = {}) {
    dispatch(loggingIn());
    auth.create(params).then(updateSession(dispatch)).then(function (res) {
      return dispatch(loggedIn(res.body));
    }).catch(ErrorResponse, checkIfGlobalError)
      .catch(GlobalError, globalError(dispatch))
      .catch(ErrorResponse, function (error) {
        const { err: { response } } = error;
        dispatch(notLoggedIn(response.body));
      }).delay(50).then(function () {
        dispatch(logInResolved());
        return null;
      });
    return null;
  };
}
