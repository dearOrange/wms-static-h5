<template>
  <div class="create">
    <wms-header title="新增仓库调拨单"/>
    <Container/>
  </div>
</template>

<script>
import clearPublicStore from '@/mixins/clearPublicStore'

import Container from '@/components/owner/stock/allot/create/Container'

export default {
  name: 'AllotCreate',
  components: {
    Container
  },
  mixins: [clearPublicStore('stock/allot/create')]
}
</script>
