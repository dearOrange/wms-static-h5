<template>
  <div class="info" @click="choose">
    <div class="name">
      {{ data.customerName }}
    </div>
    <div class="amount">
      <span class="price">价格：{{ data.ownerCustomer.priceName }}</span>
      <span class="rebate">折扣：{{ data.ownerCustomer.discount }}</span>
    </div>
    <template v-if="hasAddress">
      <div class="contact">
        <span class="cname">联系人：{{ data.address.contactName }}</span>
        <span class="cphone">联系电话：{{ data.address.mobile }}</span>
      </div>
      <div class="address">地址：{{ fullAddress }}</div>
    </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Info',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasAddress() {
      return !!this.data.address
    },
    fullAddress() {
      return this.hasAddress
        ? `${this.data.address.province}${this.data.address.city}${
            this.data.address.district
          }${this.data.address.address}`
        : ''
    }
  },
  methods: {
    ...mapMutations({
      setCustomer: 'public/setCustomer'
    }),
    choose() {
      this.setCustomer(this.data)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  > .name {
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  > .amount {
    margin-top: 10px;
    > .price {
      margin-right: 40px;
    }
  }
  > .contact {
    margin-top: 5px;
    > .cname {
      margin-right: 40px;
    }
  }
  > .address {
    margin-top: 5px;
  }
}
</style>
