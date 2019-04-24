<template>
  <div>
    <Info :data="data"/>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Features :data="data"/>
    <wms-whitespace size="10" bgcolor="rgba(0,0,0,.15)"/>
    <Links :data="data"/>
  </div>
</template>

<script>
import Info from '@/components/owner/profile/home/Info'
import Features from '@/components/owner/profile/home/Features'
import Links from '@/components/owner/profile/home/Links'
import { fetchList } from '@/api/owner/profile'
export default {
  name: 'Profile',
  layout: 'owner.tabbar',
  components: {
    Info,
    Features,
    Links
  },
  data() {
    return {
      data: {}
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      let { success, data } = await fetchList()
      if (success) {
        this.data = data
        if (this.data.extendAttr) {
          this.data.contractSoftwareType = data.extendAttr.contractSoftwareType
          this.data.contractExpireDate = data.extendAttr.contractExpireDate
          this.data.contractStatus =
            data.extendAttr.contractStatus === undefined
              ? 0
              : data.extendAttr.contractStatus
        } else {
          this.data.contractStatus = 0
        }
      }
    }
  }
}
</script>

<style>
</style>
