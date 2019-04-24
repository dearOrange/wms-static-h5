<template>
  <div class="info" @click="choose">
    <div class="name">{{ data.stockName }}</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Info',
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      depot: 'public/depot'
    })
  },

  methods: {
    ...mapMutations({
      setDepot: 'public/setDepot'
    }),
    choose() {
      let { type } = this.$route.query
      if (type) {
        this.setDepot({
          ...this.depot,
          [type]: this.data
        })
      } else {
        this.setDepot(this.data)
      }
      this.$router.go(-1)
    }
  }
}
</script>
