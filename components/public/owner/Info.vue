<template>
  <div class="info" @click="choose">
    <div class="name">
      {{ data.name }}
    </div>
    <div class="contact">
      <span class="cname">联系人：{{ data.cname }}</span>
      <span class="cphone">联系电话：{{ data.cphone }}</span>
    </div>
    <div class="address">地址：{{ data.address }}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Info',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setOwner: 'public/setOwner'
    }),
    choose() {
      this.setOwner(this.data)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  padding: 10px 0;
  > .name {
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }
  > .contact {
    margin: 5px 0;
    > .cname {
      margin-right: 40px;
    }
  }
}
</style>
