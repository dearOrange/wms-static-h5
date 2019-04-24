<template>
  <div class="result">
    <AsyncLoader :loader="fetch">
      <template slot-scope="list">
        <ul class="list">
          <template v-for="item in list">
            <li :key="item.stockId">
              <Info :data="item" />
            </li>
          </template>
        </ul>
      </template>
    </AsyncLoader>
  </div>
</template>

<script>
import AsyncLoader from '@/components/share/async-loader'
import Info from './Info'
import { getDepotList } from '@/api/public'

export default {
  name: 'Result',
  components: {
    AsyncLoader,
    Info
  },
  methods: {
    fetch() {
      return getDepotList()
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  > li {
    display: flex;
    padding: 15px 10px;
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
