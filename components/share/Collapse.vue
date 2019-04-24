<template>
  <div class="collapse">
    <div class="hd">
      <span>{{ title }}</span>
      <span class="arrow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-rt-arrow" />
        </svg>
      </span>
    </div>
    <div class="bd">
      <slot name="bd">
        内容
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WmsCollapse',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
