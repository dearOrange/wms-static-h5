<template>
  <div class="filter-bullet">
    <div class="fb-inner">
      <span class="text">
        {{ label }}
      </span>
      <span class="arrow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-down" />
        </svg>
      </span>
    </div>
    <div v-if="popupIsShown" class="fb-popup">
      <div class="content">
        操作内容
      </div>
      <div class="buttons">
        <span>取消</span>
        <span>确认</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterBullet',
  props: {
    label: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      popupIsShown: false
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-bullet {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  border-radius: 4px;
  background-color: #e9e9e9;
  font-size: 12px;
  min-width: 80px;

  > .arrow {
    margin-left: 3px;
  }
}
</style>
