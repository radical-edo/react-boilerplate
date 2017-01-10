import Immutable from 'immutable';

import { reducer } from './__reducer';

const initialState = Immutable.Map({
  error: Immutable.Map({
    status: null,
    message: null
  })
});

const handlers = {
  logOutResolved(state, action) {
    return initialState;
  },

  globalErrorResolved(state, action) {
    return state.set('error', initialState.get('error'));
  },

  globalError(state, action) {
    const { status, text: message } = action.payload.response;
    return state.set('error', Immutable.Map({ status, message }));
  }
};

export default reducer(initialState, handlers);
