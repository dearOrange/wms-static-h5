<template>
  <div>
    <div infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="reslut">
      <template v-for="(item, index) in list">
        <item :key="'item' + index" :data="item" :is-check="checkAllItem" @change="checkOut"/>
        <wms-whitespace :key="'sep' + index" size="1" bgcolor="rgba(0,0,0,.15)"/>
      </template>
    </div>
    <div v-if="isEmpty" class="load-more">
      <!-- <mt-spinner type="fading-circle" :size="16"/> -->
      <span class="text">暂无数据</span>
    </div>
    <div class="result_btn">
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      <div class="btn">
        <div class="bf" @click="checkAll()">
          <span class="bf_select">
            <i v-if="checkAllItem" class="bf_solid"/>
          </span>
          <span>{{ checkAllItem ? '取消全选' : '全选' }}</span>
        </div>
        <div class="bm">
          <span>选中数量： {{ checkNum }}</span>
          <span>剩余金额：{{ receiveMoney | CNY }}</span>
        </div>
        <div class="br" @click="toggleSheet">批量结算</div>
      </div>
    </div>
    <template v-if="isOnSheet">
      <OrderSheet :receive-money="receiveMoney" @change="cancelChange" @submit="submitOrder"/>
    </template>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { sumBy } from 'lodash'
import Item from '@/components/owner/account/receive/filter/Item'
import OrderSheet from '@/components/owner/account/receive/sheet/OrderSheet'
import { accountAll } from '@/api/account/receive'

export default {
  name: 'FilterResult',
  components: {
    Item,
    OrderSheet
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      // list: [...new Array(10)],
      checkAllItem: false,
      isOnSheet: false,
      ids: [],
      checkNum: 0,
      receiveMoney: 0,
      money: []
    }
  },
  computed: {
    isEmpty() {
      return this.list.length === 0
    }
  },
  watch: {
    checkAllItem: function(newVal, oldVal) {
      if (newVal) {
        this.checkNum = this.list.length
        this.ids = this.list.map(item => {
          return item.receivableBillUkid
        })
        this.money = this.list.map(item => {
          return {
            receivableBillUkid: item.receivableBillUkid,
            remainingAmount: item.remainingAmount
          }
        })
        this.receiveMoney = sumBy(this.list, 'remainingAmount')
      } else {
        this.checkNum = 0
        this.receiveMoney = 0
        this.money = []
        this.ids = []
      }
    }
  },
  methods: {
    loadMore() {
      // TODO 控制请求
      this.loading = true
      setTimeout(() => {
        const last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    checkOut(value) {
      if (value.check) {
        this.money.push({
          receivableBillUkid: value.data.receivableBillUkid,
          remainingAmount: value.data.remainingAmount
        })
      } else {
        this.money.forEach((ele, index) => {
          if (ele.receivableBillUkid === value.data.receivableBillUkid) {
            this.money.splice(index, 1)
          }
        })
      }
      this.ids = this.money.map(item => {
        return item.receivableBillUkid
      })
      this.receiveMoney = sumBy(this.money, 'remainingAmount')
      this.checkNum = value.check
        ? this.checkNum + 1
        : this.checkNum > 0
          ? this.checkNum - 1
          : 0
    },
    checkAll() {
      this.checkAllItem = !this.checkAllItem
    },
    toggleSheet() {
      if (this.ids.length !== 0) {
        this.isOnSheet = true
      } else {
        alert('请先选择结算项')
      }
    },
    cancelChange() {
      this.isOnSheet = false
    },
    async submitOrder(val) {
      val.billUkids = this.ids
      let { success, msg } = await accountAll(val)
      if (success) {
        MessageBox.alert('结算成功！').then(action => {
          this.$router.push('/owner/account/receive/list')
        })
      } else {
        MessageBox({
          title: '提示',
          message: msg || '结算失败',
          showCancelButton: true
        })
      }
      // this.isOnSheet = false
    }
  }
}
</script>

<style lang="scss" scoped>
.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: #999;
  > .text {
    margin-left: 5px;
  }
}
.result_btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  & > .btn {
    display: flex;
    align-items: center;
    & > .bf {
      padding: 20px;
      display: flex;
      align-items: center;
      & > .bf_select {
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 3px solid #666;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        & > .bf_solid {
          display: block;
          width: 12px;
          height: 12px;
          background: #666;
          border-radius: 50%;
          border: 1px solid #666;
        }
      }
    }
    & > .bm {
      flex: 1;
      display: flex;
      flex-direction: column;
      & > span {
        color: #f00;
      }
    }
    & > .br {
      padding: 20px;
      border-left: 1px solid #999;
      background: #26a2ff;
      color: #fff;
    }
  }
}
</style>
