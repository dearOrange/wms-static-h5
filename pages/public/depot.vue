<template>
  <section class="depot">
    <wms-header title="选择仓库" />
    <Result />
  </section>
</template>

<script>
// import Add from '@/components/public/depot/Add'
import Result from '@/components/public/depot/Result'

export default {
  name: 'PublicDepot',
  components: {
    Result
  }
}
</script>
