<template>
  <div class="field">
    <div class="field--lt">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="field--md">
      <input
        :type="type"
        :readonly="readonly"
        :value="value"
        :placeholder="placeholder"
        :class="{'field--inp': readonly}"
        @input="$emit('change', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'WmsField',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: '标题'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 42px;
  > .field--lt {
    color: #888;
  }
  > .field--md {
    flex: 1 auto;
    display: flex;
    justify-content: flex-end;
    > input {
      width: 100%;
      border: none;
      padding: 0;
      margin: 0;
      text-align: right;
    }
    > .field--inp {
      color: #888;
    }
  }
}
</style>
