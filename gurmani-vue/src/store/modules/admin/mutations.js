export default {
  SET_IS_AUTH: (state, payload) => {
    if (payload !== null) state.is_auth = true;
    else state.is_auth = false;
  },
};
