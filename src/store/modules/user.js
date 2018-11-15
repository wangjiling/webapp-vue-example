import apiUser from '../../api/user'
import * as types from '../mutation-types'

// initial state
const state = {
  userInfo: null
}

// getters
const getters = {
  userInfo: (state, getters) => state.userInfo
}

// actions
const actions = {
  loginPwd ({ commit }, loginInfo) {
    commit(types.REQUEST)
    return apiUser.loginPwd(loginInfo, (reponse) => {
      commit(types.USER_LOGIN_PWD_SUCCESS, { reponse })
    })
  },
  loginSms ({ commit }, loginInfo) {
    commit(types.REQUEST)
    return apiUser.loginSms(loginInfo, (reponse) => {
      commit(types.USER_LOGIN_SMS_SUCCESS, { reponse })
    })
  },
  getUserInfo ({ commit }) {
    commit(types.REQUEST)
    return apiUser.getUserInfo((res) => {
      commit(types.USER_INFO, res)
    })
  },
  clearUserInfo ({ commit }) {
    commit(types.USER_INFO_CLEAR)
  },
  checkPhone ({ commit }, phoneInfo) {
    commit(types.REQUEST)
    return apiUser.checkPhone(phoneInfo, (reponse) => {
      commit(types.CHECK_PHONE, { reponse })
    })
  },
  getPicCodeStatus ({ commit }, codeInfo) {
    commit(types.REQUEST)
    return apiUser.getPicCodeStatus(codeInfo, (reponse) => {
      commit(types.PIC_CODE_STATUS, { reponse })
    })
  },
  getSmsCode ({ commit }, codeInfo) {
    commit(types.REQUEST)
    return apiUser.getSmsCode(codeInfo, (reponse) => {
      commit(types.SMS_CODE, { reponse })
    })
  },
  getOpenId ({ commit }) {
    commit(types.REQUEST)
    return apiUser.getOpenId((res) => {
      commit(types.GET_OPEN_ID_SUCCESS, res)
    })
  }
}

// mutations
const mutations = {
  [types.USER_LOGIN_PWD_SUCCESS] (state, { reponse }) {
    state.reponse = reponse
  },
  [types.USER_LOGIN_SMS_SUCCESS] (state, { reponse }) {
    state.reponse = reponse
  },
  [types.USER_INFO] (state, userInfo) {
    userInfo.phone = window.atob(userInfo.phone)
    state.userInfo = userInfo
  },
  [types.USER_INFO_CLEAR] (state) {
    state.userInfo = null
  },
  [types.CHECK_PHONE] (state, { reponse }) {
    state.reponse = reponse
  },
  [types.PIC_CODE_STATUS] (state, { reponse }) {
    state.reponse = reponse
  },
  [types.SMS_CODE] (state, { reponse }) {
    state.reponse = reponse
  },
  [types.GET_OPEN_ID_SUCCESS] (state, { reponse }) {
    state.reponse = reponse
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
