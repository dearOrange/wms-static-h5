<template>
  <section class="owner">
    <wms-header title="选择货主" />
    <Result />
    <!-- <Add /> -->
  </section>
</template>

<script>
// import Add from '@/components/public/customer/Add'
import Result from '@/components/public/owner/Result'

export default {
  name: 'PublicOwner',
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
