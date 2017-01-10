export const UPDATE_SESSION_TIMER = 'Update Session Timer';

function updateSessionTimer(payload) {
  return {
    payload,
    type: UPDATE_SESSION_TIMER
  };
}

export function updateSession(dispatch) {
  return function onResponse(res) {
    dispatch(updateSessionTimer({
      data: { expires_in: parseInt(res.get('Session-Expires-In'), 10) }
    }));
    return res;
  };
}
