<template>
  <div class="info" @click="choose">
    <div class="name">{{ data.supplier.supplierName }}</div>
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
      required: true,
      default() {
        return {}
      }
    }
  },
  computed: {
    hasAddress() {
      return !!this.data.address
    },
    fullAddress() {
      return this.hasAddress
        ? `${this.data.address.province || ''}${this.data.address.city ||
            ''}${this.data.address.district || ''}${this.data.address.address}`
        : ''
    }
  },
  methods: {
    ...mapMutations({
      setProvider: 'public/setProvider'
    }),
    choose() {
      this.setProvider({
        ...this.data.supplier,
        address: this.data.address ? { ...this.data.address } : null
      })
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
  > .contact {
    margin-top: 10px;
    > .cname {
      margin-right: 40px;
    }
  }
  > .address {
    margin-top: 5px;
  }
}
</style>
