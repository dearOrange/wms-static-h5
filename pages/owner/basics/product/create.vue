<template>
  <div class="create">
    <wms-header title="新增商品信息">
      <template slot="right">
        <span @click="fetchAdd">保存</span>
      </template>
    </wms-header>
    <basics-base-info title="基本信息">
      <div class="sub--box">
        <sub class="sub">*</sub>
        <mt-field
          v-model.trim="params.productName"
          v-validate="'required'"
          data-vv-name="productName"
          label="商品名称"
          placeholder="请输入商品名称"
        />
        <span v-show="errors.has('productName')" class="is-danger">请输入商品名称</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>
      <div class="sub--box">
        <sub class="sub">*</sub>
        <basics-base-type
          v-model="params.categoryUkid"
          v-validate="'required'"
          data-vv-name="categoryUkid"
          title="商品分类"
          :list="cateList"
        />
        <span v-show="errors.has('categoryUkid')" class="is-danger">请输入商品分类</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>
      <div>
        <mt-field v-model.trim="params.productItemCode" label="商品编码" placeholder="请输入商品编码"/>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>

      <div class="sub--box">
        <sub class="sub">*</sub>
        <mt-field
          v-model.trim="params.productItemName"
          v-validate="'required'"
          data-vv-name="productItemName"
          label="规格名称"
          placeholder="请输入规格名称"
        />
        <span v-show="errors.has('productItemName')" class="is-danger">请输入规格名称</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>

      <div class="sub--box">
        <sub class="sub">*</sub>
        <basics-base-select
          v-model="params.measureType"
          v-validate="'required'"
          data-vv-name="measureType"
          title="计量方式"
          :list="typeList"
        />
        <span v-show="errors.has('measureType')" class="is-danger">请选择计量方式</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>

      <div class="sub--box">
        <sub class="sub">*</sub>
        <basics-base-select
          v-model="params.measureUnit"
          v-validate="'required'"
          data-vv-name="measureUnit"
          title="计量单位"
          :list="unitList"
        />
        <span v-show="errors.has('measureUnit')" class="is-danger">请选择计量单位</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>

      <div v-if="params.measureType === 'CT'">
        <mt-field
          v-model.trim="params.productItemWeight"
          v-validate="'price'"
          data-vv-name="price"
          type="number"
          label="重量"
          placeholder="请输入商品重量"
        />
        <span v-show="errors.has('price')" class="is-danger">请输入正确的商品重量</span>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>

      <div>
        <mt-cell title="销售状态">
          <mt-switch v-model="salevalue"/>
        </mt-cell>
        <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      </div>
    </basics-base-info>
    <basics-base-info title="图片">
      <div class="upload_img">
        <div v-for="(item,index) in productImages" :key="index" class="product-image-div">
          <img :src="item.url" class="product-image">
          <div v-if="deleteImageEnabled" class="img_del_btn">
            <button type="button" @click="deleteImage(index)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
        <div v-if="productImages.length < 5" class="img__btn">
          <button type="button" @click="chooseImage">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tianjia"></use>
            </svg>
          </button>
        </div>
        <div v-if="productImages.length > 0" class="img__btn">
          <div class="img__btn_enabled" v-if="deleteImageEnabled"></div>
          <button type="button" @click="enableDeleteImage">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jianshao"></use>
            </svg>
          </button>
        </div>
      </div>
    </basics-base-info>
    <basics-base-info title="其他信息">
      <mt-field v-model.trim="params.barCode" label="商品条码" placeholder="请输入商品条码"/>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      <!-- <basics-base-select v-model="params.purchaseMeasureUnit" title="采购单位" :list="unitList"/> -->
      <mt-field
        v-model.trim="params.perUnitCost"
        v-validate="'price'"
        data-vv-name="perUnitCost"
        label="采购单价"
        type="number"
        placeholder="请输入采购单价"
      />
      <span v-show="errors.has('perUnitCost')" class="is-danger">请输入正确的采购单价</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      <!-- <basics-base-select v-model="params.salesMeasureUnit" title="销售单位" :list="unitList"/> -->
      <mt-field
        v-model.trim="params.perUnitPrice"
        v-validate="'price'"
        data-vv-name="perUnitPrice"
        label="销售单价"
        type="number"
        placeholder="请输入销售单价"
      />
      <span v-show="errors.has('perUnitPrice')" class="is-danger">请输入正确的销售单价</span>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      <mt-field
        v-model.trim="params.productItemDesc"
        type="textarea"
        :attr="{ maxlength: 250 }"
        rows="4"
        label="描述"
        placeholder="请输入商品描述"
      />
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
      <mt-cell title="状态">
        <mt-switch v-model="value"/>
      </mt-cell>
      <wms-whitespace size="1" bgcolor="rgba(0,0,0,0.15)"/>
    </basics-base-info>
  </div>
</template>

<script>
import BaseInfo from '@/components/owner/basics/create/BaseInfo'
import BaseSelect from '@/components/owner/basics/create/BaseSelect'
import BaseType from '@/components/owner/basics/create/type'
import { addList, getDetail, editList } from '@/api/base/product'
import { fetchList, cateType, getUrls } from '@/api/public'
import { MessageBox } from 'mint-ui'
import wx from 'weixin-js-sdk'
import { weixinJsConfig } from '@/api/auth'
import error from '@/utils/error'

export default {
  name: 'ProductCreate',
  components: {
    BasicsBaseInfo: BaseInfo,
    BasicsBaseSelect: BaseSelect,
    BasicsBaseType: BaseType
  },
  data() {
    return {
      value: true,
      salevalue: true,
      params: {
        productName: '',
        categoryUkid: '',
        productItemCode: '',
        productItemName: '',
        measureType: '',
        measureUnit: '',
        barCode: '',
        productItemWeight: '',
        productItemDesc: '',
        // purchaseMeasureUnit: '',
        perUnitCost: '',
        // salesMeasureUnit: '',
        perUnitPrice: '',
        status: '',
        saleStatus: ''
      },
      cateList: [],
      typeList: [],
      unitList: [],
      productImages: [],
      productImageMediaIds: [],
      isIos: false,
      uploadCount: 0,
      deleteImageEnabled: false
    }
  },
  mounted() {
    this.getList()
    this.initWeixin()
  },
  methods: {
    async initWeixin() {
      let url = location.href.split('#')[0]

      let ua = navigator.userAgent.toLowerCase()
      let isIos = ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1
      this.isIos = isIos
      let isWeixin = ua.indexOf('micromessenger') !== -1
      if (isWeixin && isIos) {
        // iOS 微信有BUG
        url = 'http://h5.wms.1hll.cn/choose'
      }

      let { success, data } = await weixinJsConfig({
        appid: 'wx0790124a79149af3',
        url: url
      })
      if (success) {
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx0790124a79149af3', // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getLocalImgData'
          ], // 必填，需要使用的JS接口列表
          success: function(res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            console.log('wx success')
          },
          fail: function(res) {
            console.log(res)
          }
        })
        wx.ready(function() {
          console.log('wx ready')
        })

        wx.error(function(res) {
          console.log('wx error')
          console.log(res)
        })
      }
    },
    chooseImage() {
      this.deleteImageEnabled = false
      let self = this
      wx.chooseImage({
        count: 5, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          if (self.isIos && window.__wxjs_is_wkwebview) {
            self.showIOSImage(localIds, self)
          } else {
            for (let index in localIds) {
              if (self.productImages.length >= 5) {
                error('1001', { message: '最多可选择 5 张图片' })
                return
              }
              self.productImages.push({
                url: localIds[index],
                localId: localIds[index],
                isNew: true
              })
            }
          }

          console.log(self.productImages)
        }
      })
    },
    showIOSImage(localIds, self) {
      if (self.productImages.length >= 5) {
        error('1001', { message: '最多可选择 5 张图片' })
        return
      }
      let localId = localIds.pop()
      wx.getLocalImgData({
        localId: localId,
        success: function(res) {
          let localData = res.localData // localData是图片的base64数据，可以用img标签显示
          // localData = localData.replace('jgp', 'jpeg') // iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
          self.productImages.push({
            url: localData,
            localId: localId,
            isNew: true
          })
          if (localIds.length > 0) {
            self.showIOSImage(localIds, self)
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    },
    enableDeleteImage() {
      this.deleteImageEnabled = !this.deleteImageEnabled
    },
    deleteImage(index) {
      console.log(index)
      this.productImages.splice(index, 1)
      if (this.productImages.length === 0) {
        this.deleteImageEnabled = false
      }
    },
    fetchAdd() {
      this.$validator.validate().then(result => {
        if (result) {
          this.params.status = this.value ? 1 : 0
          this.params.saleStatus = this.salevalue ? 1 : 0
          // if (
          //   this.params.measureUnit === 'G' ||
          //   this.params.measureUnit === 'JN' ||
          //   this.params.measureUnit === 'KG' ||
          //   this.params.measureUnit === 'T'
          // ) {
          //   if (!this.params.productItemWeight) {
          //     MessageBox('提示', '请填写重量')
          //     return
          //   }
          // }

          // 上传图片
          this.uploadCount = 0
          this.productImageMediaIds = []
          this.uploadAndSave()
        }
      })
    },
    async uploadAndSave() {
      let self = this
      let count = self.productImages.length // 需要上传图片的本地ID的数组长度
      if (self.uploadCount < count) {
        if (self.productImages[self.uploadCount].isNew) {
          wx.uploadImage({
            localId: self.productImages[self.uploadCount].localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              self.productImageMediaIds.push(res.serverId) // serverIds是我定义的全局数组变量
              self.uploadCount++
              self.uploadAndSave()
            }
          })
        } else {
          self.productImageMediaIds.push(
            self.productImages[self.uploadCount].localId
          )
          self.uploadCount++
          self.uploadAndSave()
        }
      } else {
        this.params.itemImageUkids = this.productImageMediaIds.join(',')
        if (this.$route.query.id) {
          let { success, msg } = await editList(this.params)
          if (success) {
            MessageBox.alert('编辑成功').then(action => {
              this.$router.push('/owner/basics/product/list')
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
              this.$router.push('/owner/basics/product/list')
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
    },
    async getList() {
      let { success: success1, data: cateData } = await cateType()
      if (success1) {
        this.cateList = cateData
      }
      let { success: success2, data: typeData } = await fetchList('MeasureType')
      if (success2) {
        this.typeList = typeData
      }
      let { success: success3, data: unitData } = await fetchList('MeasureUnit')
      if (success3) {
        this.unitList = unitData
      }
      if (this.$route.query.id) {
        let { success: success4, data: detailData } = await getDetail(
          this.$route.query.id
        )
        if (success4) {
          detailData.categoryUkid = detailData.categoryUkid + ''
          if (detailData.status === 1) {
            this.value = true
          } else {
            this.value = false
          }
          if (detailData.saleStatus === 1) {
            this.salevalue = true
          } else {
            this.salevalue = false
          }
          this.params = detailData

          if (
            this.params.itemImageUkids !== '' &&
            this.params.itemImageUkids != null &&
            this.params.itemImageUkids !== undefined
          ) {
            let { success: success4, data: urls } = await getUrls({
              fileUkids: this.params.itemImageUkids
            })
            if (success4) {
              for (let index in urls) {
                this.productImages.push({
                  url: urls[index].fileUrl,
                  localId: urls[index].fileUkid,
                  isNew: false
                })
              }
            }
          }
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
.upload_img {
  display: flex;
  height: 84px;
}
.product-image-div {
  position: relative;
  margin: 4px 2px;
  border: 1px solid #d9d9d9;
  display: inline-block;
  height: 74px;
  width: 74px;
  line-height: 70px;
  overflow: hidden;
  text-align: center;

  .product-image {
    vertical-align: middle;
    margin: 1px;
    height: 64px;
  }
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
.img__btn {
  position: relative;
  width: 52px;
  height: 52px;
  border: 1px dashed #ccc;
  margin: 14px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
    z-index: 10;
  }

  .img__btn_enabled {
    background-color: rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.img_del_btn {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  background: transparent;
  justify-content: center;
  align-items: center;

  > button {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 0;
    border-radius: 50%;

    svg {
      font-size: 16px;
      color: #ff4500;
    }
  }
}
</style>

<style>
.mint-cell-text {
  font-size: 14px !important;
}
</style>
