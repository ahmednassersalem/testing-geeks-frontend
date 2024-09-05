export const state = () => ({
  user: null,
  registeredData: null,
});

export const mutations = {
  store(state, userObj) {
    state.user = userObj;
  },

  storeRegisteredData(state, userObj) {
    state.registeredData = userObj;
  },

  resetState(state) {
    state.user = null;
  },
};
