<template>
  <section class="shipper">
    <wms-header title="货主信息" />
    <Form />
  </section>
</template>

<script>
import Form from '@/components/owner/profile/shipper/Form'

export default {
  name: 'Shipper',
  components: {
    Form
  }
}
</script>
