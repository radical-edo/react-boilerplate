export const GLOBAL_ERROR_RESOLVED = 'Global Error Resolved';
export const GLOBAL_ERROR = 'Global Error';

function globalErrorResolved() {
  return {
    payload: null,
    type: GLOBAL_ERROR_RESOLVED
  };
}

function globalErrorInit(payload) {
  return {
    payload, 
    type: GLOBAL_ERROR
  };
}

export function resolveGlobalError(dispatch) {
  return function () {
    dispatch(globalErrorResolved());
  };
}

export function globalError(dispatch) {
  return function (payload) {
    dispatch(globalErrorInit(payload));
  };
}
