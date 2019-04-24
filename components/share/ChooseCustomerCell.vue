<template>
  <div class="choose-customer-cell">
    <wms-cell title="客户" :value="customerName" to="/public/customer" is-link />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChooseCustomerCell',
  model: {
    prop: 'customer',
    event: 'change'
  },
  props: {
    customer: {
      type: Object,
      default() {
        return null
      }
    }
  },
  computed: {
    ...mapGetters({
      chooseCustomer: 'public/customer'
    }),

    customerName() {
      let chooseCustomer = this.chooseCustomer
      if (chooseCustomer) {
        return chooseCustomer.customerName
      } else {
        return this.customer && this.customer.customerName
      }
    }
  },
  watch: {
    chooseCustomer(newValue) {
      let value = newValue
      if (value) {
        this.$emit('change', value)
      }
    }
  }
}
</script>
