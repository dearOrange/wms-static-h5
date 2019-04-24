<template>
  <div class="rang--box">
    <span class="count">{{ data || 0 }}</span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'Rang',
  props: {
    data: {
      type: Number
    },
    label: String
  }
}
</script>

<style lang="scss" scoped>
.rang--box {
  width: 100px;
  height: 100px;
  border: 3px solid #9bc5f9;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  > span {
    margin: 3px 0;
  }
  > .count {
    font-size: 22px;
  }
}
</style>
