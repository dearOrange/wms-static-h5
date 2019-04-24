<template>
  <div class="create">
    <wms-header title="仓库信息">
      <template slot="right">
        <span @click="fetchAdd">保存</span>
      </template>
    </wms-header>
    <div class="sub--box">
      <sub class="sub">*</sub>
      <mt-field
        v-model.trim="params.stockName"
        v-validate="'required'"
        data-vv-name="stockName"
        label="名称"
        placeholder="请输入名称"
      />
      <span v-show="errors.has('stockName')" class="is-danger">请输入名称</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    </div>
    <div class="sub--box">
      <sub class="sub">*</sub>
      <basics-base-select
        v-model="params.stockType"
        v-validate="'required'"
        data-vv-name="stockType"
        title="仓库类型"
        :list="list"
      />
      <span v-show="errors.has('stockType')" class="is-danger">请选择仓库类型</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    </div>
  </div>
</template>

<script>
import BaseSelect from '@/components/owner/basics/create/BaseSelect'
import { addList, getDetail, editList } from '@/api/base/ware'
import { fetchList } from '@/api/public'
import { MessageBox } from 'mint-ui'

export default {
  name: 'ProductCreate',
  components: {
    BasicsBaseSelect: BaseSelect
  },
  data() {
    return {
      params: {
        stockName: '',
        stockType: ''
      },
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    fetchAdd() {
      this.$validator.validate().then(async result => {
        if (result) {
          if (this.$route.query.id) {
            let { success, msg } = await editList(this.params)
            if (success) {
              MessageBox.alert('编辑成功').then(action => {
                this.$router.push('/owner/basics/warehouse/list')
              })
            } else {
              MessageBox({
                title: '提示',
                message: msg || '编辑失败',
                showCancelButton: true
              })
            }
          } else {
            let { success, msg } = await addList(this.params)
            if (success) {
              MessageBox.alert('新增成功').then(action => {
                this.$router.push('/owner/basics/warehouse/list')
              })
            } else {
              MessageBox({
                title: '提示',
                message: msg || '新增失败',
                showCancelButton: true
              })
            }
          }
        }
      })
    },
    async getList() {
      let { success: success2, data: wareData } = await fetchList('StockType')
      if (success2) {
        this.list = wareData
      }
      if (this.$route.query.id) {
        let { success: success1, data: detailData } = await getDetail(
          this.$route.query.id
        )
        if (success1) {
          this.params = detailData
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.is-danger {
  color: #f00;
  padding: 0 10px 10px;
}
.sub--box {
  position: relative;
}
.sub {
  position: absolute;
  color: #f00;
  top: 15px;
  left: 4px;
  z-index: 9;
}
</style>

<style>
.mint-cell-text {
  font-size: 14px !important;
}
</style>
