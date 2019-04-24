<template>
  <div class="base-info">
    <ChooseDepotCell title="调出仓库" type="b" @change="data.fromStockId = $event.stockId"/>
    <ChooseDepotCell title="调入仓库" type="a" @change="data.toStockId = $event.stockId"/>
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from 'vuex'

import ChooseDepotCell from '@/components/share/ChooseDepotCell'

export default {
  name: 'BaseInfo',
  components: {
    ChooseDepotCell
  },
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
