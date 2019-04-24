<template>
  <div class="item">
    <div>
      <div class="classify_card">
        <div>{{ data.supplier.supplierName }}</div>
        <div>状态：{{ data.supplier.status === 1 ? '启用' : '停用' }}</div>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <mt-button plain type="primary" size="small" @click="extendList">{{ isShow ? '收起' : '展开' }}</mt-button>
      <mt-button plain type="primary" size="small" @click="edit(data.supplier.supplierId)">编辑</mt-button>
    </div>
    <template v-if="isShow">
      <div class="order--hide">
        <div>联系人：{{ data.address.contactName }}</div>
        <div>手机：{{ data.address.mobile }}</div>
        <div
          class="order--address"
        >
          地址：{{ data.address.province }}{{ data.address.city }}{{ data.address.district }}{{ data.address.address }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ProviderItem',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    extendList() {
      this.isShow = !this.isShow
    },
    edit(id) {
      this.$router.push({
        path: '/owner/basics/provider/create',
        query: { id: id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.classify_card {
  padding: 10px;
}
.order--hide {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px;
  border-top: 1px solid #ccc;
  & > div {
    width: 50%;
    padding: 10px 0;
  }
  & > .order--address {
    width: 100%;
  }
}
.operation {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  /deep/ button {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
