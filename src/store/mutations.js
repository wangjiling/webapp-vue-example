import * as types from './mutation-types'

export default {
  [types.REQUEST] (state) {
    console.log('request')
  },
  [types.APP_ISWX] (state, isWX) {
    state.isWX = isWX
  }
}
