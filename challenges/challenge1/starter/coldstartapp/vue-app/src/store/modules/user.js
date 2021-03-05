import { SET_USER } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
  },
  actions: {
    async setUserAction({ commit, payload }) {
      try {
        commit(SET_USER, payload);
        return payload;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    user: (state) => state.user,
  },
};
