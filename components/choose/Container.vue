<template>
  <div class="container">
    <template v-if="loading">
      <WmsLoading title="正在确认用户类型..."/>
    </template>
    <template v-else>
      <template v-if="exsitCustomer">
        <Customer :list="customerList" :title="exsitOwner ? '我是客户' : '选择下单的货主'" @pick="goCustomerHome"/>
        <wms-whitespace size="40"/>
      </template>
      <Customer v-if="exsitOwner" :list="ownerList" :title="'我是货主'" @pick="goOwnerHome"/>
      <div v-if="allNotExist">
        <Title :text="'我是客户'"/>
        <wms-whitespace size="10" />
        <div style="text-align: center">没有关联的货主,请先联系添加</div>

        <wms-whitespace size="40" />
        <Title :text="'我是货主'"/>
        <div class="owner-info">
          <wms-whitespace size="10" />
          <div>货主没有关联,联系老板添加</div>
          <wms-whitespace size="10" />
          <div>/</div>
          <wms-whitespace size="10" />
          <div>没有开通系统服务</div>
          <wms-whitespace size="20" />
          <div>
            <div class="owner-subscribe"><a @click="goSubscribe">现在开通</a></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Title from './Title'
import Customer from './Customer'

import { getUserTypes, saveUserType } from '@/api/choose'
export default {
  name: 'Container',
  components: {
    Title,
    Customer
  },
  data() {
    return {
      customerList: [],
      ownerList: [],
      loading: true,
      allNotExist: false
    }
  },
  computed: {
    exsitCustomer() {
      return this.customerList && this.customerList.length > 0
    },
    exsitOwner() {
      return this.ownerList && this.ownerList.length > 0
    },
    uniqueCustomer() {
      return (
        this.exsitCustomer && this.customerList.length === 1 && !this.exsitOwner
      )
    },
    uniqueOwner() {
      return (
        this.exsitOwner && this.ownerList.length === 1 && !this.exsitCustomer
      )
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.fetch()
    },
    async fetch() {
      let {
        success,
        data: { customerList, owmerList }
      } = await getUserTypes()
      if (success) {
        this.customerList = customerList
        this.ownerList = owmerList

        if (this.uniqueCustomer) {
          this.goCustomerHome(this.customerList[0])
        } else if (this.uniqueOwner) {
          this.goOwnerHome(this.ownerList[0])
        } else if (!this.exsitOwner && !this.exsitCustomer) {
          this.allNotExist = true
          this.loading = false
        } else {
          this.loading = false
        }
      }
    },
    async goCustomerHome(item) {
      let { success } = await this.save(item)
      if (success) {
        this.$router.replace('/customer/home')
      }
    },
    async goOwnerHome(item) {
      let { success } = await this.save(item)
      if (success) {
        this.$router.replace('/owner/home')
      }
    },
    goSubscribe() {
      this.$router.push('/subscribe/join')
    },
    save(item) {
      return saveUserType({
        ...item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .owner-info {
    text-align: center;
  }

  .owner-subscribe {
    display: inline-block;
    height: 44px;
    width: 160px;
    border-radius: 6px;
    background: #26a2ff;
    color: #fff;

    a {
      line-height: 40px;
    }
  }
}
</style>
