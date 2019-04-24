<template>
  <div class="create">
    <wms-header title="新增商品分类">
      <template slot="right">
        <span @click="fetchAdd">保存</span>
      </template>
    </wms-header>
    <div class="sub--box">
      <sub class="sub">*</sub>
      <mt-field
        v-validate="'required'"
        data-vv-name="categoryName"
        v-model.trim="params.categoryName"
        label="分类名称"
        placeholder="请输入分类名称"
      />
      <span v-show="errors.has('categoryName')" class="is-danger">请输入分类名称</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </div>
    <div>
      <basics-base-select v-model="params.parentCategoryUkid" title="上级分类" :list="cateList"/>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </div>
  </div>
</template>

<script>
import BaseSelect from '@/components/owner/basics/create/type'
import { addList, getDetail, editList } from '@/api/base/classify'
import { cateType } from '@/api/public'
import { MessageBox } from 'mint-ui'

export default {
  name: 'ProductCreate',
  components: {
    BasicsBaseSelect: BaseSelect
  },
  data() {
    return {
      cateList: [],
      params: {
        categoryName: '',
        parentCategoryUkid: ''
      }
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
                this.$router.push('/owner/basics/classify/list')
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
                this.$router.push('/owner/basics/classify/list')
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
      let { success: success1, data: cateData } = await cateType()
      if (success1) {
        this.cateList = cateData
      }
      if (this.$route.query.id) {
        let { success: success2, data: catesData } = await getDetail(
          this.$route.query.id
        )
        if (success2) {
          catesData.categoryName = catesData.categoryName.toString()
          catesData.parentCategoryUkid = catesData.parentCategoryUkid + ''
          this.params = { ...this.params, ...catesData }
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
