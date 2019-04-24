<template>
  <div>
    <Navlink title="退出登录" @click="logout"/>
  </div>
</template>
<script>
import Navlink from '@/components/share/NavLink'
import { logout } from '@/api/auth'
export default {
  name: 'LogoutLink',
  components: {
    Navlink
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
