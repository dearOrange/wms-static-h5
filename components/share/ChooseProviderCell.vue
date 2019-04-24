<template>
  <div class="choose-provider-cell">
    <wms-cell title="供应商" :value="providerName" to="/public/provider" is-link/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WmsChooseProviderCell',
  model: {
    prop: 'provider',
    event: 'change'
  },
  props: {
    provider: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters({
      chooseProvider: 'public/provider'
    }),

    providerName() {
      let chooseProvider = this.chooseProvider
      if (chooseProvider) {
        return chooseProvider && chooseProvider.supplierName
      } else {
        return this.provider && this.provider.supplierName
      }
    }
  },

  watch: {
    chooseProvider(newValue) {
      let value = newValue
      if (value) {
        this.$emit('change', value)
      }
    }
  }
}
</script>
