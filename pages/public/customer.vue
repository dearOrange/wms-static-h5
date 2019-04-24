<template>
  <section class="client">
    <wms-header title="选择客户" />
    <Result />
    <!-- <Add /> -->
  </section>
</template>

<script>
// import Add from '@/components/public/customer/Add'
import Result from '@/components/public/customer/Result'

export default {
  name: 'PublicClient',
  components: {
    Result
  },

  fetch({ store }) {
    // TODO 数据初始化
    // let initialized = store.getters
    // console.log(store.state.client)
    return Promise.resolve('')
  }
}
</script>
