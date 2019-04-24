<template>
  <section class="shipper">
    <wms-header title="收货信息"/>
    <Form/>
  </section>
</template>

<script>
import Form from '@/components/customer/profile/shipper/Form'

export default {
  name: 'Shipper',
  components: {
    Form
  }
}
</script>
