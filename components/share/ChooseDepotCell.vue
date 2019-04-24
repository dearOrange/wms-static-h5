<template>
  <div class="choose-depot-cell">
    <wms-cell :title="title" :value="depotName" :to="toPath" is-link/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChooseDepotCell',
  model: {
    prop: 'depot',
    event: 'change'
  },
  props: {
    depot: {
      type: [Object]
    },
    type: {
      type: String
    },
    title: {
      type: String,
      default: '仓库'
    }
  },
  computed: {
    ...mapGetters({
      chooseDepot: 'public/depot'
    }),

    toPath() {
      let query = ``
      if (this.type) {
        query = `?type=${this.type}`
      }
      return `/public/depot${query}`
    },

    depotName() {
      let chooseDepot = this.chooseDepot
      if (chooseDepot) {
        if (this.type) {
          chooseDepot = chooseDepot[this.type]
        }
        return chooseDepot && chooseDepot.stockName
      } else {
        if (this.type) {
          return (
            this.depot &&
            this.depot[this.type] &&
            this.depot[this.type].stockName
          )
        }
        return this.depot && this.depot.stockName
      }
    }
  },
  watch: {
    chooseDepot(newValue) {
      let value = newValue
      if (value) {
        if (this.type) {
          value = value[this.type]
        }
        this.$emit('change', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
