import util from './index';

export const host = util.getHost();

export const appDownloadUrl = '';

// login
export const apiLoginPwd = '/api/user/login_pwd';
export const apiLoginSms = '/api/user/login_sms';
export const apiUserInfo = '/api/user/get_currentuser_info';
export const apiCheckPhone = '/api/user/validatephone';
export const apiPicCodeStatus = '/api/user/check_salt_pic_status';
export const apiSmsCode = '/api/user/smscode';
export const apiGetUserOpenId = '/api/user/get_user_openid?redirect=';
export const apiGetPicCode = '/api/user/generatecodepict?pid=';

// openid
export const apiGetOpenId = '/api/user/get_user_openid';

// weixin share
export const apiWxShareConfig = 'https://www.test.com/api/treasure/get_weixin_config';
export const wxShareJs = '//res.wx.qq.com/open/js/jweixin-1.0.0.js';
