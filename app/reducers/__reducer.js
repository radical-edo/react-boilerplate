import { camelCase, isFunction } from 'lodash';

export function reducer(initialState, handlers) {
  return function onDispatch(state = initialState, action) {
    const fn = camelCase(action.type);
    if (isFunction(handlers[fn])) {
      return handlers[fn](state, action);
    } else {
      if ('development' === NODE_ENV) {
        console.debug('Action:', action.type, "didn't reduce the state.");
      }
      return state;
    }
  };
}
