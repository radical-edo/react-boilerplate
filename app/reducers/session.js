import Immutable from 'immutable';

import { TOKEN_ID } from '../constants';
import { reducer } from './__reducer';

const initialState = Immutable.Map({
  logOutRequest: Immutable.Map({
    status: null,
    payload: null,
    errors: Immutable.List([])
  }),
  meRequest: Immutable.Map({
    status: null,
    payload: null,
    errors: Immutable.List([])
  }),
  logInRequest: Immutable.Map({
    status: null,
    payload: null,
    errors: Immutable.List([])
  }),
  timer: Immutable.Map({ expires_in: null }),
  current_user: Immutable.Map({
    token: Immutable.Map({})
  })
});

const handlers = {
  loggingOut(state, action) {
    return state.update('logOutRequest', function (logOutRequest) {
      return logOutRequest.set('status', 'init');
    });
  },

  loggedOut(state, action) {
    return state.update('logOutRequest', function (logOutRequest) {
      return logOutRequest.set('status', 'success');
    });
  },

  logOutResolved(state, action) {
    return initialState;
  },

  updateSessionTimer(state, action) {
    return state.set('timer', Immutable.Map({ expires_in: action.payload.data.expires_in }));
  },

  gettingMe(state, action) {
    return state.update('meRequest', function (meRequest) {
      return meRequest.set('status', 'init');
    });
  },

  meGotten(state, action) {
    const { payload: { data: current_user } = {} } = action;
    const newState =  state.update('meRequest', function (logInRequest) {
      return logInRequest.merge(Immutable.Map({ status: 'success', payload: action.payload }));
    });
    return newState.set('current_user', Immutable.fromJS(current_user));
  },

  meNotGotten(state, action) {
    const { payload: { errors = [] } = {} } = action;
    return state.update('meRequest', function (meRequest) {
      return meRequest.merge(Immutable.Map({ status: 'error', errors: Immutable.List(errors) }));
    });
  },

  gettingMeResolved(state, action) {
    return state.set('meRequest', initialState.get('meRequest'));
  },

  globalError(state, action) {
    return state.update('logInRequest', function (current) {
      return current.set('status', 'resolved');
    });
  },

  logInResolved(state, action) {
    return state.set('logInRequest', initialState.get('logInRequest'));
  },

  notLoggedIn(state, action) {
    const { payload: { errors = [] } = {} } = action
    return state.update('logInRequest', function (logInRequest) {
      return logInRequest.merge(Immutable.Map({ status: 'error', errors: Immutable.List(errors) }));
    });
  },

  loggedIn(state, action) {
    const { payload: { data: current_user } } = action;
    const newState =  state.update('logInRequest', function (logInRequest) {
      return logInRequest.merge(Immutable.Map({ status: 'success', payload: action.payload }));
    });
    const { token: { access_token = 'NO_TOKEN_RECEIVED' } = {} } = current_user;
    localStorage.setItem(TOKEN_ID, access_token);
    return newState.set('current_user', Immutable.fromJS(current_user));
  },

  loggingIn(state, action) {
    return state.update('logInRequest', function (current) {
      return current.set('status', 'init');
    });
  }
};

export default reducer(initialState, handlers);
