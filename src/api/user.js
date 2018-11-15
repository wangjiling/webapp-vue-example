import api from './api'
import { host, apiLogout, apiUserInfo, apiLoginPwd, apiLoginSms, apiCheckPhone, apiPicCodeStatus, apiSmsCode, apiRegister, apiRegisterSuccess, apiGenerateCodePic, apiResetLoginPwdValidate, apiResetLoginPwdComplete, apiPayPwdIdentity, apiPayPwdValidate, apiPayPwdSet, apiGetOpenId } from '../utils/constants'
export default {
  loginPwd (loginInfo, cb) {
    const success = (res) => {
      if (res && res.data) {
        cb(res.data)
      }
    }
    return api.post({
      endpoint: apiLoginPwd,
      success: success,
      params: loginInfo
    })
  },
  loginSms (loginInfo, cb) {
    const success = (res) => {
      if (res && res.data) {
        cb(res.data)
      }
    }
    return api.post({
      endpoint: apiLoginSms,
      success: success,
      params: loginInfo
    })
  },
  checkPhone (data, cb) {
    const success = (res) => {
      if (res && res.data) {
        cb(res.data)
      }
    }
    return api.post({
      endpoint: apiCheckPhone,
      success: success,
      params: data
    })
  },
  getPicCodeStatus (data, cb) {
    const success = (res) => {
      if (res && res.data) {
        cb(res.data)
      }
    }
    return api.post({
      endpoint: apiPicCodeStatus,
      success: success,
      params: data
    })
  },
  getSmsCode (data, cb) {
    const success = (res) => {
      if (res && res.data) {
        cb(res.data)
      }
    }
    return api.post({
      endpoint: apiSmsCode,
      success: success,
      params: data
    })
  },
  getUserInfo (cb) {
    const success = (res) => {
      if (res && res.data) {
        cb(res.data)
      }
    }
    return api.get({
      endpoint: apiUserInfo,
      success: success,
      allowDirect: false
    })
  },
  getOpenId (cb) {
    const success = (res) => {
      if (res) {
        cb(res)
      }
    }
    return api.get({
      endpoint: apiGetOpenId,
      success: success
    })
  }
}
