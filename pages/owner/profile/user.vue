<template>
  <section class="user">
    <wms-header title="个人信息">
      <template slot="right">
        <span @click="clear">清除</span>
      </template>
    </wms-header>
    <Form ref="form"/>
  </section>
</template>

<script>
import Form from '@/components/owner/profile/user/Form'

export default {
  name: 'User',
  components: {
    Form
  },
  methods: {
    clear() {
      this.$refs.form.clear()
    }
  }
}
</script>
