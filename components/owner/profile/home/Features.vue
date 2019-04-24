<template>
  <div class="features">
    <div class="icons">
      <IconLink
        class="item"
        :text="'待发订单'"
        :to="{
          name: 'owner-order-list',
          params: {
            data: ['100', '550']
          }
        }"
        icon="dingdan"
        :data="data.seOrderHeaderSum"
      />
      <IconLink
        class="item"
        :text="'待收退货'"
        :to="{
          name: 'owner-reorder-list',
          params: {
            data: ['100']
          }
        }"
        icon="tuihuo4"
        :data="data.seReturnHeaderCount"
      />
      <IconLink
        class="item"
        :text="'待收入库'"
        :to="{
          name: 'owner-purchase-list',
          params: {
            data: ['100', '200']
          }
        }"
        icon="ruku"
        :data="data.prPurchaseHeaderCount"
      />
      <IconLink
        class="item"
        :text="'待退出库'"
        :to="{
          name: 'owner-repurchase-list',
          params: {
            data: ['100']
          }
        }"
        icon="chuku"
        :data="data.prPurchaseBackCount"
      />
      <IconLink
        class="item"
        :text="'待结应收'"
        :to="{
          name: 'owner-account-receive-list',
          params: {
            data: ['10', '50']
          }
        }"
        icon="shoukuan"
        :data="data.frReceivableBillCount"
      />
      <IconLink
        class="item"
        :text="'待结应付'"
        :to="{
          name: 'owner-account-pay-list',
          params: {
            data: ['10', '50']
          }
        }"
        icon="fukuan2"
        :data="data.fpPayableBillCount"
      />
    </div>
  </div>
</template>

<script>
import IconLink from './IconLink'
import { waitData } from '@/api/owner/profile'
export default {
  name: 'Features',
  components: {
    IconLink
  },
  data() {
    return {
      data: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      let { success, data } = await waitData()
      if (success) {
        this.data = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icons {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px;
  > .item {
    flex-shrink: 0;
    margin: 10px 0;
  }
}
</style>
