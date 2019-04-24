<template>
  <InnerLoader class="inner" :render="render" :status="status"/>
</template>

<script>
import Loader, { LOADER_STATUS } from './loader'
export default {
  name: 'AsyncLoader',
  components: {
    InnerLoader: Loader
  },
  props: {
    loader: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      data: null,
      status: LOADER_STATUS.UNSTART
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    render() {
      if (this.$slots.default) {
        return this.$slots.default
      }
      return this.$scopedSlots.default(this.data)
    },

    async fetch() {
      this.status = LOADER_STATUS.LOADING
      let { success, data } = await this.loader()
      if (success) {
        this.data = data
        this.status = LOADER_STATUS.SUCCESS
        this.$emit('success', data)
      } else {
        this.status = LOADER_STATUS.ERROR
      }
    },
    init() {
      this.fetch()
    }
  }
}
</script>
