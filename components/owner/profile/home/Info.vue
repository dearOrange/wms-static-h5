<template>
  <div>
    <div class="info">
      <div class="avatar">
        <img :src="data.avatar">
      </div>
      <div class="name">
        <div>{{ data.userName }}</div>
        <div>{{ data.fullName }}</div>
      </div>
      <svg class="icon" aria-hidden="true" @click="edit">
        <use xlink:href="#icon-bianji"></use>
      </svg>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="contract">
      <div v-if="data.contractStatus == 2" class="contract_info">当前系统：已过期</div>
      <div v-else-if="data.contractStatus == 0" class="contract_info">当前系统：未购买</div>
      <div v-else class="contract_info">
        当前系统：{{ data.contractExpireDate | date('YYYY-MM-DD') }} 过期
      </div>
      <div v-if="data.contractStatus == 0" class="buy" @click="goSubscribe">购买</div>
      <div v-else class="buy" @click="goSubscribe">续费</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonInfo',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    edit() {
      this.$router.push({
        name: 'owner-profile-user',
        params: { data: this.data }
      })
    },
    goSubscribe() {
      this.$router.push('/subscribe')
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0 10px;
  > .avatar {
    height: 64px;
    border-radius: 50%;
    > img {
      display: block;
      height: 100%;
      border-radius: 50%;
    }
  }
  > .name {
    margin-left: 10px;
    flex: 1;
  }

  > .icon {
    justify-self: flex-end;
    color: #999;
  }
}
.contract {
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0 10px;

  .contract_info {
    flex: 1;
  }

  .buy {
    justify-self: flex-end;
    background: #26a2ff;
    color: #fff;
    padding: 8px 18px;
    border-radius: 4px;
  }
}
</style>
