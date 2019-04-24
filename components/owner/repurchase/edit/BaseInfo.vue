<template>
  <div class="base-info">
    <ChooseProviderCell @change="data.supplierId = $event.supplierId"/>
    <ChooseDepotCell @change="data.stockId = $event.stockId"/>
  </div>
</template>

<script>
import ChooseProviderCell from '@/components/share/ChooseProviderCell'
import ChooseDepotCell from '@/components/share/ChooseDepotCell'

export default {
  name: 'BaseInfo',
  components: {
    ChooseProviderCell,
    ChooseDepotCell
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
.base-info {
  padding: 10px 0;
}
</style>
