<template>
  <div class="tabbar">
    <div class="tabbar--skeleton"/>
    <mt-tabbar v-model="tabType" fixed class="tabbar--main">
      <mt-tab-item id="home">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye" />
        </svg>
        <span>首页</span>
      </mt-tab-item>
      <mt-tab-item id="order">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-caigou1" />
        </svg>
        <span>订单</span>
      </mt-tab-item>
      <mt-tab-item id="profile">
        <svg slot="icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-wode2" />
        </svg>
        <span>我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { findKey } from 'lodash'

const tabRoutes = {
  home: '/customer/home',
  order: '/customer/order/list',
  profile: '/customer/profile'
}

export default {
  name: 'WmsTabbar',

  data() {
    return {
      tabType: ''
    }
  },

  computed: {
    path() {
      return this.$router.currentRoute.fullPath
    }
  },

  watch: {
    tabType(nType, oType) {
      const toRoute = tabRoutes[nType]
      if (toRoute) {
        this.$router.push(toRoute)
      }
    }
  },

  created() {
    this.tabType = this.findTypeByPath(this.$router.currentRoute.fullPath)
  },

  methods: {
    findTypeByPath(path) {
      const type = findKey(tabRoutes, item => {
        return item === path
      })
      return type
    }
  }
}
</script>

<style lang="scss" scoped>
$tabbarHeight: 60px;

.tabbar {
  &--skeleton {
    height: $tabbarHeight;
    // /purchase/list
  }
  &--main {
    height: $tabbarHeight;
    box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.5);
  }
  .icon {
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }
}
</style>
