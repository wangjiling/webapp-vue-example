<template>
  <div id="app" class="app">
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from './store/mutation-types'
  import util from './utils'
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'appInfo',
        'userInfo'
      ])
    },
    created () {
      if (util.isWX) {
        this.$store.commit(types.APP_ISWX, true)
      }
      this.$store.dispatch('getUserInfo')
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  @import "./style/style.scss"
</style>
