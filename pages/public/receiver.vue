<template>
  <section class="receiver">
    <wms-header title="收货信息" />
    <Form />
  </section>
</template>

<script>
import Form from '@/components/public/receiver/Form'

export default {
  name: 'PublicReceiver',
  components: {
    Form
  }
}
</script>
