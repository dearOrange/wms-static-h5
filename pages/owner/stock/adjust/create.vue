<template>
  <div class="create">
    <wms-header title="新增库存调整单"/>
    <Container/>
  </div>
</template>

<script>
import clearPublicStore from '@/mixins/clearPublicStore'

import Container from '@/components/owner/stock/adjust/create/Container'

export default {
  name: 'AdjustCreate',
  components: {
    Container
  },
  mixins: [clearPublicStore('stock/adjust/create')]
}
</script>
