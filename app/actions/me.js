import { Resource, ErrorResponse } from 'browser-resource';

import { updateSession } from './session';
import { globalError } from './global_errors';
import { checkIfGlobalError, GlobalError } from '../utils';

export const GETTING_ME = 'Getting Me';
export const ME_GOTTEN = 'Me Gotten';
export const ME_NOT_GOTTEN = 'Me Not Gotten';
export const GETTING_ME_RESOLVED = 'Getting Me Resolved';

function gettingMe() {
  return {
    type: GETTING_ME
  };
}

function meGotten(payload) {
  return {
    payload,
    type: ME_GOTTEN
  };
}

function meNotGotten(payload) {
  return {
    payload,
    type: ME_NOT_GOTTEN
  };
}

function gettingMeResolved() {
  return {
    type: GETTING_ME_RESOLVED
  };
}

const me = new Resource('/me');

export function getMe(dispatch) {
  return function () {
    dispatch(gettingMe());
    return me.list().then(updateSession(dispatch)).then(function (res) {
      dispatch(meGotten(res.body));
      return null;
    }).catch(ErrorResponse, checkIfGlobalError)
      .catch(GlobalError, globalError(dispatch))
      .catch(ErrorResponse, function (error) {
        dispatch(meNotGotten(error.err.response.body));
        throw error;
      })
      .delay(50)
      .then(function () {
        dispatch(gettingMeResolved());
        return null;
      });
  };
}

export function getMeResolve(dispatch) {
  return function () {
    dispatch(gettingMeResolved());
  };
}
