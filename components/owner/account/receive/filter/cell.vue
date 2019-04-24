<template>
  <div class="account_cell">{{ desc }}</div>
</template>

<script>
export default {
  name: 'ReceiveCell',
  props: {
    desc: String
  }
}
</script>

<style lang="scss" scoped>
.account_cell {
  width: 50%;
  padding: 6px 0;
}
</style>
