<template>
  <form class="search" @submit.prevent="onSubmit">
    <div class="search--inner">
      <svg class="icon search--icon" aria-hidden="true">
        <use xlink:href="#icon-magnifier"></use>
      </svg>
      <input
        v-model="value"
        class="search--input"
        type="search"
        :placeholder="placeholder"
        @input="onSubmit"
      >
      <svg v-if="isExist" class="icon search--close" aria-hidden="true" @click="clear">
        <use xlink:href="#icon-close"></use>
      </svg>
    </div>
  </form>
</template>

<script>
export default {
  name: 'WmsSearch',

  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      value: ''
    }
  },
  computed: {
    isExist() {
      return this.value !== ''
    }
  },
  methods: {
    clear() {
      this.value = ''
      this.onSubmit()
    },
    onSubmit() {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
$bgColor: #ebebeb;

.search {
  width: 100%;
  &--inner {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10px;
    // border: 1px solid #ccc;
    background-color: $bgColor;
  }

  &--icon {
    flex: 0 auto;
    width: 24px;
    height: 24px;
  }

  &--input {
    border: 0;
    outline: 0;
    padding: 0 10px;
    width: 100%;
    height: 44px;
    flex: 0 auto;
    background-color: $bgColor;
  }

  &--close {
    flex: 0 auto;
    position: absolute;
    right: 15px;
    width: 16px;
    height: 16px;
  }
}
</style>
