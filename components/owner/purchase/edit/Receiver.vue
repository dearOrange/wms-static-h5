<template>
  <div class="receiver">
    <Box>
      <template slot="hd">
        <div class="receiver--title">
          <span>收货人信息</span>
          <span v-if="hasReceiverContent" @click="goReceiver">编辑</span>
        </div>
      </template>
      <div slot="bd" class="receiver--content">
        <template v-if="hasReceiverContent">
          <div class="personal">
            <span class="name">{{ receiver.name }}</span>
            <span class="phone">{{ receiver.phone }}</span>
          </div>
          <wms-whitespace size="20" />
          <div class="address">
            {{ receiver.district.join('') }}{{ receiver.address }}
          </div>
        </template>
        <template v-else>
          <div class="empty">
            请<a @click="goReceiver">填写</a>收货信息
          </div>
        </template>
      </div>
    </Box>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Box from '@/components/share/Box'

export default {
  name: 'Receiver',
  components: {
    Box
  },

  computed: {
    ...mapGetters({
      receiver: 'public/receiver'
    }),

    hasReceiverContent() {
      return !!this.receiver
    }
  },

  methods: {
    goReceiver() {
      // this.$router.push({
      //   path: '/public/receiver'
      // })
      this.$router.push('/public/receiver')
    }
  }
}
</script>

<style lang="scss" scoped>
.receiver--title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.personal {
  > .name {
    margin-right: 15px;
  }
}
.empty {
  padding: 15px 0;
  text-align: center;
  > a {
    margin: 0 3px;
    text-decoration: underline;
    color: #26a2ff;
  }
}
</style>
