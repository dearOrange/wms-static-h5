<template>
  <div class="base-info">
    <ChooseDepotCell @change="data.stockId = $event.stockId"/>
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
