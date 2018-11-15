<style scoped>
</style>

<template>
<div class="login-container">
  <div class="logo-container">
    <i class="icon logo-icon"></i>
    <div class="iswx" v-if="isWX">
      成功登录后将绑定微信服务号
    </div>
  </div>
  <div class="login-form" name="login-form">
    <mt-field class="input phone" type="tel" placeholder="请输入手机号码" v-model="phone" id='phone' @input.native="inputPhoneNumber" :attr="{maxlength: 13}"></mt-field>
    <mt-field class="input password" placeholder="请输入登录密码" type="password" v-model="password" id="password" key="password" :type="passwordType" v-show="showPwd" @input.native="inputPassword" :attr="{maxlength: 20}">
      <i class="icon eye-icon" :class="{'eye-icon-open': !passwordType}" @click="changePassword"></i>
    </mt-field>
    <mt-field class="input dynamic" placeholder="请输入6位动态码" type="tel" v-model="dynamic" id='dynamic' v-show="!showPwd" @input.native="inputDynamic" :attr="{maxlength: 6}">
      <button class="dya-count" @click="isPhoneExist" :disabled="!phone || codeDisabled" :class="{'dya-count-send': codeDisabled}">
      {{dyaCount}}
        <span v-show="codeSend">s</span>
      </button>
    </mt-field>
    <mt-field class="input code" placeholder="请输入右侧字母" v-model="code" v-show="showPic" id='code' :attr="{maxlength: 4}" @input.native="inputCode">
      <img :src="picUrl" @click="getCodePic" height="48px" width="100px" alt="验证码图片">
    </mt-field>
    <div class="btn">
      <mt-button class="login-btn" :class="{'login-btn-disabled': !btnStatus}" type="primary" size="large" @click="login" :disabled = "!btnStatus">登录</mt-button>
      <div class="other-link pwd" v-show="showPwd" key="password">
        <router-link :to="{path: '/forget'}">忘记密码</router-link>
        <a href="javascript: void(0);" @click="changeLogin">手机动态码登录</a>
      </div>
      <div class="other-link dya" v-show="!showPwd" key="dynamic">
        <a href="javascript: void(0);" @click="changeLogin" >使用手机及密码登录</a>
      </div>
      <div class="or-line">
        <div class="line"></div>
        <div class="or">or</div>
        <div class="line"></div>
      </div>
      <router-link class="register-link" :to="{path: '/register'}">
        立即注册{{couponDetail.showCouponTip4WX == 1? '领 ' + couponDetail.couponAmount4WX + ' 红包':''}}
      </router-link>
    </div>
  </div>
  <!-- for test start -->
  <!--<img src="../../assets/img/webapp-vue-example.png"/>-->
  <!--<img src="../../assets/img/svg/logo.svg"/>-->
  <!-- for test end -->
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import Debounce from 'lodash.debounce'
import util from '../../utils'
import { host, apiGetPicCode, apiGetUserOpenId } from '../../utils/constants'

export default {
  name: 'LoginView',
  data () {
    return {
      phone: '',
      password: '',
      dynamic: '',
      code: '',
      showPwd: true,
      showPic: false,
      erroCode: 0,
      erroMsg: {
        1: '请输入正确的手机号码',
        2: '帐号或密码有误',
        3: '图形验证码有误',
        4: '该手机号码尚未注册',
        5: '动态码有误',
        6: '动态码已失效，请重新获取'
      },
      pwdErroCount: 0,
      btnStatus: false,
      picUrl: '',
      dyaCount: '获取',
      countNumber: 59,
      codeSend: false,
      codeDisabled: true,
      codeInterval: null,
      passwordType: 'password',
      isWX: true,
      styleHeight: { height: window.screen.availHeight + 'px' },
      couponDetail: {},
      randCode: ''
    }
  },
  created () {
    this.isWX = this.$store.state.isWX
  },
  computed: mapGetters({
    userInfo: 'userInfo'
  }),
  watch: {
    userInfo (val) {
      if (val) {
        this.$router.push({
          path: this.$router.currentRoute.query['redirect'] || '/finance'
        })
      }
    }
  },
  destroyed () {
    clearInterval(this.codeInterval)
  },
  methods: {
    isPhoneValid () {
      return /^1/.test(this.getPhoneNumber())
    },
    getPhoneNumber () {
      return this.phone.replace(/\s/g, '')
    },
    isPhoneLengthValid () {
      return this.getPhoneNumber() && this.getPhoneNumber().length === 11
    },
    inputPhoneNumber: Debounce(function () {
      let inpVal = this.phone
      let formatVal = util.formatPhoneSeparate(inpVal)
      if (formatVal !== inpVal) {
        this.phone = formatVal
      }
      this.getLoginStatus()
      let phone = this.getPhoneNumber()
      if (phone && phone.length === 11 && !this.codeSend) {
        this.codeDisabled = false
      } else {
        this.codeDisabled = true
      }
    }, 50),
    inputPassword: Debounce(function () {
      this.password = this.password.replace(/[\u4e00-\u9fa5]/g, '')
      this.getLoginStatus()
    }, 50),
    inputDynamic: Debounce(function () {
      this.dynamic = this.dynamic.replace(/[\D]/g, '')
      this.getLoginStatus()
    }, 50),
    inputCode: Debounce(function () {
      this.code = this.code.replace(/[^\da-zA-Z]/g, '')
      this.getLoginStatus()
    }, 50),
    getLoginStatus () {
      let phone = this.isPhoneLengthValid()
      let password = this.password.length >= 6
      let dynamic = this.dynamic.length === 6
      let status = phone && ((this.showPwd && password) || (!this.showPwd && dynamic))
      this.btnStatus = this.showPic ? this.code.length === 4 && status : status
    },
    changePassword () {
      this.passwordType = this.passwordType ? null : 'password'
    },
    changeLogin () {
      this.showPwd = !this.showPwd
      this.getLoginStatus()
    },
    getParams () {
      if (this.showPwd) {
        return {
          method: 'loginPwd',
          para: {
            phone: this.getPhoneNumber(),
            password: this.password,
            picCode: this.showPic && this.code ? this.code : null,
            randCode: this.showPic && this.randCode ? this.randCode : null,
            platform: 2
          }
        }
      } else {
        return {
          method: 'loginSms',
          para: {
            phone: this.getPhoneNumber(),
            code: this.dynamic,
            picCode: this.showPic && this.code ? this.code : null,
            randCode: this.showPic && this.randCode ? this.randCode : null,
            platform: 2
          }
        }
      }
    },
    login () {
      this.$Spinner.show(1)
      let data = this.getParams()
      if (this.isPhoneValid()) {
        this.$store.dispatch(data.method, data.para).then((res) => {
          this.$Spinner.show(0)
          if (res && res.status === 0) {
            Toast({
              message: '登录成功',
              className: 'login-success-toast',
              duration: 2000,
              iconClass: 'icon-success'
            })
            this.$store.dispatch('clearFinanceInfo')
            // bind wx openid
            const redirect = this.$router.currentRoute.query['redirect'] || '/finance'
            var currentHost = util.getCurrentLocation()
            setTimeout(() => {
              window.location.href = host + apiGetUserOpenId + currentHost + '/wx/#' + redirect
            }, 1500)
          } else {
            this.showErroMsg(res.status)
            this.picCodeShow()
          }
        })
      } else {
        this.$Spinner.show(0)
        this.showErroMsg(1)
      }
    },
    getErroCode (status) {
      switch (status) {
        case 1:
          this.erroCode = 1
          break
        case 0:
          this.erroCode = 4
          break
        case -2:
          this.erroCode = 5
          break
        case -3:
        case -5:
        case -6:
          this.erroCode = 2
          this.pwdErroCount++
          break
        case -9:
          if (this.showPic) {
            this.erroCode = 3
          }
          break
        case -65:
          this.erroCode = 6
          break
        default:
          this.erroCode = 0
          break
      }
    },
    showErroMsg (status) {
      this.getErroCode(status)
      if (this.erroCode === 2 && this.pwdErroCount === 3) {
        MessageBox({
          title: '',
          message: '换个方式登录？\r\n您可使用手机动态码快捷登录',
          showCancelButton: true,
          confirmButtonText: '动态码登录'
        }).then((action) => {
          if (action === 'confirm') {
            this.showPwd = false
          }
        })
      } else if (this.erroCode) {
        Toast({
          message: this.erroMsg[this.erroCode],
          duration: 2000
        })
      }
    },
    isPhoneExist () {
      if (this.isPhoneLengthValid() && this.isPhoneValid()) {
        this.$store.dispatch('checkPhone', {
          phone: this.getPhoneNumber()
        }).then((res) => {
          if (res && res.status === 0 && res.data.being === 0) {
            this.showErroMsg(res.data.being)
          } else if (res && res.status === 0 && res.data.being === 1) {
            this.getDynamic()
          }
        })
      } else {
        this.showErroMsg(1)
      }
    },
    getCodePic () {
      let date = (new Date()).getTime()
      let phone = this.getPhoneNumber()
      let rand = Math.floor(Math.random() * 100000)
      if (phone) {
        this.randCode = date + phone + rand
        this.picUrl = host + apiGetPicCode + this.randCode
      }
    },
    picCodeShow () {
      this.$store.dispatch('getPicCodeStatus', {
        phone: this.getPhoneNumber(),
        operatorType: 'LOGIN'
      }).then((res) => {
        if (res && res.status === 0 && res.data.showSaltPic === 'PIC_LOGIN') {
          this.getCodePic()
          this.showPic = true
          this.getLoginStatus()
        }
      })
    },
    countTimer () {
      this.dyaCount = this.countNumber
      if (this.countNumber <= 0) {
        this.countNumber = 59
        this.dyaCount = '获取'
        this.codeSend = false
        if (this.isPhoneLengthValid()) {
          this.codeDisabled = false
        }
        clearInterval(this.codeInterval)
      } else {
        this.countNumber--
      }
    },
    startTimer () {
      if (this.codeSend === false) {
        this.codeSend = true
        this.codeDisabled = true
        this.dyaCount = 60
        this.codeInterval = setInterval(this.countTimer, 1000)
      }
    },
    getDynamic () {
      this.$store.dispatch('getSmsCode', {
        phone: this.getPhoneNumber(),
        opType: 'LOGIN'
      }).then((res) => {
        if (res && res.status === 0) {
          this.startTimer()
        }
      })
    }
  },
  components: {
  }
}
</script>
