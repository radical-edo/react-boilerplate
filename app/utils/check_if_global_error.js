export const GlobalError = (function () {
  function GlobalError(response) {
    Error.apply(this);
    this.response = response;
  }
  GlobalError.prototype = Object.create(Error.prototype);

  return GlobalError;
})();

export function checkIfGlobalError(error) {
  const { err: { response = {} } = {} } = error;
  if (404 === response.status || 500 === response.status) {
    throw new GlobalError(response);
  } else {
    throw error;
  }
}
