<template>
  <section class="provider">
    <wms-header title="选择供应商" />
    <Result />
    <!-- <Add /> -->
  </section>
</template>

<script>
// import Add from '@/components/public/provider/Add'
import Result from '@/components/public/provider/Result'

export default {
  name: 'PublicProvider',
  components: {
    // Add,
    Result
  }
}
</script>
