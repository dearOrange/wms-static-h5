<template>
  <div class="choose">
    <wms-header :title="`${chooseTypeName}`" :back-icon="false">
      <template slot="right">
        <span @click="logout">重新登录</span>
      </template>
    </wms-header>
    <Container />
  </div>
</template>

<script>
import Container from '@/components/choose/Container'
import { logout } from '@/api/auth'

export default {
  name: 'Choose',
  components: {
    Container
  },
  computed: {
    chooseTypeName() {
      return '登录选择'
    }
  },

  methods: {
    async logout() {
      let { success } = await logout()
      if (success) {
        this.$router.replace('/login')
      }
    }
  }
}
</script>
