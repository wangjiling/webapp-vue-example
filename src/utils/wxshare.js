import {apiWxShareConfig, wxShareJs} from './constants'
import util from './index'
document.addEventListener('DOMContentLoaded', () => {
  if (util.isWX) {
    const href = window.location.href
    const url = encodeURIComponent(href.split('#')[0])
    const spt = document.createElement('script')
    document.body.appendChild(spt)
    spt.onload = () => {
      let wx = window.wx
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          let data = JSON.parse(xhr.response).data
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ]
          })
        }
      }
      xhr.open('GET', apiWxShareConfig + '?url=' + url, false)
      xhr.send(null)
      const shareData = {
        title: 'vue',
        desc: 'vue',
        link: href,
        imgUrl: window.location.protocol + '//' + window.location.host + '/static/img/logo300_300.png'
      }
      wx.ready(() => {
        wx.onMenuShareAppMessage(shareData)
        wx.onMenuShareTimeline(shareData)
        wx.onMenuShareQQ(shareData)
        wx.onMenuShareQZone(shareData)
        wx.onMenuShareWeibo(shareData)
      })
    }
    spt.src = wxShareJs
  }
}, false)
