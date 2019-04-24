<template>
  <div class="receiver">
    <Box>
      <template slot="hd">
        <div class="receiver--title">
          <span>收货人信息</span>
          <span v-if="hasReceiverContent" @click="goReceiver">修改</span>
        </div>
      </template>
      <div slot="bd" class="receiver--content">
        <template v-if="hasReceiverContent">
          <div class="personal">
            <span class="name">联系人：{{ receiver.name }}</span>
            <span class="phone">联系电话：{{ receiver.phone }}</span>
          </div>
          <wms-whitespace size="20"/>
          <div class="address">地址：{{ pcdText }}{{ receiver.address }}</div>
        </template>
        <template v-else>
          <div class="empty">
            请
            <a @click="goReceiver">填写</a>收货信息
          </div>
        </template>
      </div>
    </Box>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { connectedName } from '@/utils/area'

import Box from '@/components/share/Box'

export default {
  name: 'Receiver',
  components: {
    Box
  },

  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    ...mapGetters({
      receiver: 'public/receiver'
    }),

    hasReceiverContent() {
      return !!this.receiver
    },
    // 省市区信息
    pcdText() {
      return connectedName(this.receiver.district)
    }
  },

  watch: {
    receiver(newReceiver) {
      if (newReceiver) {
        let {
          name: receiverContactName,
          phone: receiverMobile,
          address: receiverAddress,
          district
        } = newReceiver
        let [
          receiverProvinceCode,
          receiverCityCode,
          receiverDistrictCode
        ] = district
        Object.assign(this.data, {
          receiverContactName,
          receiverMobile,
          receiverAddress,
          receiverProvinceCode,
          receiverCityCode,
          receiverDistrictCode
        })
      }
    }
  },

  methods: {
    goReceiver() {
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
