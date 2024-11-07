import Vue from 'vue';
import Vuex from 'vuex';
import { message } from 'ant-design-vue';
import { setStorage } from '@/utils';
import { Network } from '@/config/constants';
import { ethers } from 'ethers';
import { getUserInfo } from '@/api';
let loadingGetUserInfo = false;
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    fundData: [
      {
        balance: 0,
      },
    ],
    statics: {
      cash: 0,
      portfolio: 0,
    },
    device: 'desktop',
    account: null,
    chainId: null,
    desireChainId: Object.keys(Network)[0],
    // currentTheme: getStorage('currentTheme') || 'night',
    currentTheme: 'day',
    web3model: null,
  },
  getters: {
    chainType(state) {
      let chainId = state.desireChainId;
      if (!chainId) {
        return null;
      }
      return Network[chainId]['chainType'];
    },
    payToken(state) {
      let chainId = state.desireChainId;
      if (!chainId) {
        return {};
      }
      console.log(Network[chainId])
      return Network[chainId]['payToken'];
    },
    chainName(state) {
      let chainId = state.desireChainId;
      if (!chainId) {
        return {};
      }
      return Network[chainId]['chainName'];
    },

    ferc20(state) {
      let chainId = state.desireChainId;
      if (!chainId) {
        return {};
      }
      return Network[chainId]['ferc20'];
    },
    isConnected(state) {
      if (!state.chainId) {
        return false;
      }
      return state.chainId == state.desireChainId;
    },
    explorer(state) {
      let chainId = state.desireChainId;
      if (!chainId) {
        return null;
      }
      return Network[chainId]['blockExplorerUrls'][0];
    },
  },
  mutations: {
    SET_ACCOUNT: (state, account) => {
      if (account) {
        account = ethers.utils.getAddress(account);
      }
      state.account = account;
    },
    Set_Web3modal(state, value) {
      state.web3model = value;
    },
    SET_CHAINID: (state, id) => {
      state.chainId = id;
    },
    SET_FUNDData: (state, data) => {
      state.fundData = data;
    },
    SET_STATICS: (state, data) => {
      state.statics = data;
    },
    SET_DESIRE_CHAINID: (state, id) => {
      state.desireChainId = id;
    },
    SET_THEME: (state, theme) => {
      state.currentTheme = theme;
      setStorage('currentTheme', theme);
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_DesireChain: (state, value) => {
      state.desireChainId = value;
    },
  },
  actions: {
    async getUserInfo({ commit, getters }, account) {
      if (loadingGetUserInfo) {
        return;
      }
      loadingGetUserInfo = true;
      let res = await getUserInfo(account, getters.chainType);
      if (res.code == 0) {
        commit('SET_FUNDData', res.data);
        commit('SET_STATICS', res.extra);
      }
      loadingGetUserInfo = false;
    },
    async updateAccount({ commit }, account) {
      commit('SET_ACCOUNT', account);
    },
    updateChainId({ commit }, id) {
      if (this.state.chainId == id) {
        return;
      }
      commit('SET_CHAINID', id);
    },
    updateDesireChainId({ commit }, id) {
      if (this.state.desireChainId == id) {
        return;
      }
      console.log('updateDesireChainId', id);
      commit('SET_DESIRE_CHAINID', id);
    },
    updateTheme({ commit }, theme) {
      commit('SET_THEME', theme);
    },
    async connected({ commit }) {
      if (!window.ethereum) {
        message.error('install MetaMask first!');
        return;
      }
      let ethereum;
      if (window.ethereum.providers) {
        ethereum = window.ethereum.providers[0];
      } else {
        ethereum = window.ethereum;
      }
      try {
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        let account = accounts[0];
        commit('SET_ACCOUNT', account);
        return true;
      } catch (err) {
        console.log('connect error', err.message);
      }
      return false;
    },
    async switchNetwork({ state, commit, dispatch }, chainId) {
      if (chainId) {
        commit('SET_DESIRE_CHAINID', chainId);
      }
      if (!chainId) {
        chainId = state.desireChainId;
      }
      if (!window.ethereum) {
        return;
      }
      let ethereum;
      if (window.ethereum.providers) {
        ethereum = window.ethereum.providers[0];
      } else {
        ethereum = window.ethereum;
      }
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
        commit('SET_CHAINID', chainId);
        if (!state.account) {
          dispatch('connected');
        }
        // window.location.reload();
        return true;
      } catch (switchError) {
        console.log('switchError', switchError.message);
        if (switchError.code == '4001') return;
        // This error code indicates that the chain has not been added to MetaMask.
        try {
          let fields = ['chainId', 'chainName', 'nativeCurrency', 'rpcUrls', 'blockExplorerUrls', 'iconUrls'];
          let obj = {};
          for (let i = 0; i < fields.length; i++) {
            obj[fields[i]] = Network[chainId][fields[i]];
          }
          let params = [obj];
          console.log(params);
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params,
          });
          if (!state.account) {
            let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            let account = accounts[0];
            commit('SET_ACCOUNT', account);
          }
          // window.location.reload();
          commit('SET_CHAINID', chainId);
          if (!state.account) {
            dispatch('connected');
          }
          return true;
        } catch (addError) {
          console.log('addError', addError.message);
        }
      }
      return false;
    },
  },
});
