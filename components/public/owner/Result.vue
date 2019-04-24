<template>
  <div class="result">
    <ul class="list">
      <li>
        <Info
          :data="{
            name: '农链万家3号店1',
            price: '批发价格',
            rebate: '0.8',
            cname: '王小二1',
            cphone: '13100000000',
            address: '浙江省杭州市江干区新加坡科技园1号'
          }"
        />
      </li>
      <li>
        <Info
          :data="{
            name: '农链万家3号店2',
            price: '批发价格',
            rebate: '0.8',
            cname: '王小二2',
            cphone: '13200000000',
            address: '浙江省杭州市江干区新加坡科技园2号'
          }"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Info from './Info'
export default {
  name: 'Result',
  components: {
    Info
  }
}
</script>

<style lang="scss" scoped>
.list {
  > li {
    display: flex;
    padding: 0 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    /deep/ .info {
      flex: 1 auto;
    }

    > .edit {
      align-self: center;
    }
  }
}
</style>
