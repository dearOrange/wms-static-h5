<template>
  <form class="form">
    <wms-field v-model="data.name" title="收货人" placeholder="请输入收货人姓名"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field
      v-model="data.phone"
      v-validate="'required|phone'"
      data-vv-name="phone"
      title="联系电话"
      placeholder="请输入联系电话"
      type="tel"
    />
    <span v-show="errors.has('phone')" class="is-danger">请输入正确的联系电话</span>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-district v-model="data.district"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <wms-field v-model="data.address" title="详细地址" placeholder="请输入详细地址"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>

    <Confirm @confirm="confirm"/>
  </form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import Confirm from './Confirm'

export default {
  name: 'ReceiverForm',
  components: {
    Confirm
  },
  data() {
    return {
      data: {
        name: '',
        phone: '',
        district: [], // 省市区
        address: ''
      }
    }
  },

  computed: {
    ...mapGetters({
      receiver: 'public/receiver'
    })
  },
  beforeMount() {
    let storeData = this.$store.getters['public/receiver']
    if (storeData) {
      this.data = cloneDeep(storeData)
    }
  },
  methods: {
    ...mapMutations({
      setReceiver: 'public/setReceiver'
    }),
    confirm() {
      this.$validator.validate().then(result => {
        if (result) {
          this.setReceiver({
            ...this.data
          })
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.is-danger {
  color: #f00;
  padding: 0 10px 10px;
}
</style>
