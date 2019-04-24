<template>
  <div class="item">
    <div class="order-card">
      <div class="card-hd">
        <div class="order--total">
          <!-- <svg v-if="!data.productItemImage" class="icon" aria-hidden="true">
            <use xlink:href="#icon-zanwutupian1-copy-copy-copy-copy"></use>
          </svg>-->
          <WmsGoodsPreview v-if="!data.productItemImage"/>
          <img v-if="data.productItemImage" class="preview" :src="data.productItemImage">
          <span class="total">库存{{ data.inventoryQtySum || 0 }}</span>
        </div>
        <div class="order--goods">
          <div class="name">{{ data.productName }}</div>
          <div class="info">
            <span>规格：</span>
            <span>{{ data.productItemName }}</span>
          </div>
          <div class="info">
            <span>单位：</span>
            <span>{{ data.measureUnitName }}</span>
          </div>
        </div>
        <div class="order--price">
          <div class="pay--price">
            <span>采购价：</span>
            <span>{{ data.perUnitCost | CNY }}</span>
          </div>
          <div class="send--price">
            <span>销售价：</span>
            <span>{{ data.perUnitPrice | CNY }}</span>
          </div>
        </div>
      </div>
    </div>
    <wms-whitespace size="1" bgcolor="rgba(0,0,0,.15)"/>
    <div class="operation">
      <mt-button plain type="primary" size="small" @click="extendList">{{ isShow ? '收起' : '展开' }}</mt-button>
      <mt-button plain type="primary" size="small" @click="edit( data.productItemUkid )">编辑</mt-button>
    </div>
    <template v-if="isShow">
      <div class="order--hide">
        <div>商品编码：{{ data.productItemCode }}</div>
        <div>分类：{{ data.categoryName }}</div>
        <div>计量方式：{{ data.measureTypeName }}</div>
        <div>计量单位：{{ data.measureUnitName }}</div>
        <div>状态：{{ data.status === 1 ? '启用' : '停用' }}</div>
        <div>销售状态：{{ data.saleStatus === 1 ? '销售中' : '下架' }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PurchaseItem',
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    extendList() {
      this.isShow = !this.isShow
    },
    edit(id) {
      this.$router.push({
        path: '/owner/basics/product/create',
        query: { id: id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-card {
  padding: 10px;
  > .card-hd {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > .order--total {
      margin-right: 15px;
      > .icon {
        width: 64px;
        height: 64px;
        color: #ccc;
      }
      > .preview {
        width: 64px;
        height: 64px;
      }
    }
  }
  > .card-bd {
    margin-top: 10px;
  }
}
.order--total {
  width: 96px;
  position: relative;
  text-align: center;

  > .preview {
    display: inline-block;
    height: 96px;
  }

  > .total {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 28px;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }
}
.order--goods {
  flex: 1;
}
.order--hide {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px;
  border-top: 1px solid #ccc;
  & > div {
    width: 50%;
    padding: 10px 0;
  }
}
.sepline {
  height: 1px;
  margin: 10px;
  background: #ccc;
}

.operation {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  /deep/ button {
    margin-left: 5px;
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
