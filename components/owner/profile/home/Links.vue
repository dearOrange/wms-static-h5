<template>
  <div class="links">
    <Navlink title="货主信息" to="/owner/profile/shipper"/>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <Shipper :address="address" :owner="owner"/>
    <!-- <wms-whitespace size="2" bgcolor="rgba(0,0,0,.15)"/>
    <Navlink title="商城二维码" to="/owner/profile/QRcode"/>-->
    <wms-whitespace size="2" bgcolor="rgba(0,0,0,.15)"/>
    <Navlink title="关于农链万家" to="/owner/profile/about"/>
    <wms-whitespace size="2" bgcolor="rgba(0,0,0,.15)"/>
    <LogoutLink/>
    <wms-whitespace size="2" bgcolor="rgba(0,0,0,.15)"/>
  </div>
</template>

<script>
import { fetchOwner } from '@/api/owner/profile'
import Navlink from '@/components/share/NavLink'
import Shipper from './Shipper'
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
  },
  data() {
    return {
      address: {},
      owner: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let {
        success,
        data: { address, owner }
      } = await fetchOwner()
      if (success) {
        this.address = address
        this.owner = owner
      }
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
