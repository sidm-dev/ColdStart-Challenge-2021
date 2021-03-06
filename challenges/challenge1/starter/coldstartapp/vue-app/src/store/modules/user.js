import getUserInfo from '../../assets/js/userInfo';
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
    async updateUserAction({ commit }) {
      try {
        const payload = await getUserInfo();
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
