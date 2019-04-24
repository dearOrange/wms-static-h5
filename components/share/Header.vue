<template>
  <div class="header">
    <div class="header--skeleton"/>
    <mt-header fixed :title="title">
      <template slot="left">
        <slot v-if="backIcon" name="left"/>
        <mt-button v-else icon="back" @click="back"/>
      </template>

      <template slot="right">
        <slot name="right"/>
      </template>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: 'WmsHeader',

  props: {
    title: {
      type: String,
      required: true
    },
    backIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 48px;

.header {
  position: relative;
  z-index: 999;
  &--skeleton {
    height: $headerHeight;
  }

  /deep/ header {
    height: $headerHeight;
    z-index: 999;
  }
}
</style>
