<template>
  <div class="links">
    <Shipper />
    <wms-whitespace size="2" bgcolor="rgba(0,0,0,.15)"/>
    <Navlink title="关于农链万家" to="/customer/profile/about"/>
    <wms-whitespace size="2" bgcolor="rgba(0,0,0,.15)"/>
    <LogoutLink/>
    <wms-whitespace size="2" bgcolor="rgba(0,0,0,.15)"/>
  </div>
</template>

<script>
import Navlink from '@/components/share/NavLink'
import Shipper from './shipper'
import LogoutLink from './LogoutLink'
export default {
  name: 'Links',
  components: {
    Navlink,
    Shipper,
    LogoutLink
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.box--content {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.title {
  padding: 10px;
}
</style>
