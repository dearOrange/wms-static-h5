<template>
  <div>
    <Box :title="'销售管理'" bd-borderness>
      <template slot="bd">
        <div class="list">
          <IconLink :text="'销售订单'" to="/owner/order/list" :icon="'dingdan'"/>
          <IconLink :text="'销售退货'" to="/owner/reorder/list" :icon="'xiaoshoutuihuodan'"/>
          <IconLink :text="'新增订单'" to="/owner/order/edit" :icon="'dingdan1'"/>
          <IconLink :text="'新增销退'" to="/owner/reorder/edit" :icon="'tuihuoshenqing'"/>
        </div>
      </template>
    </Box>
    <Box :title="'采购管理'" bd-borderness>
      <template slot="bd">
        <div class="list">
          <IconLink :text="'采购订单'" to="/owner/purchase/list" :icon="'caigoudingdan'"/>
          <IconLink :text="'采购退货'" to="/owner/repurchase/list" :icon="'caigoutuihuodan'"/>
          <IconLink :text="'新增采购'" to="/owner/purchase/edit" :icon="'caigoudan'"/>
          <IconLink :text="'新增采退'" to="/owner/repurchase/edit" :icon="'tuihuo4'"/>
        </div>
      </template>
    </Box>
    <Box :title="'结算管理'" bd-borderness>
      <template slot="bd">
        <div class="list">
          <IconLink :text="'应收帐单'" to="/owner/account/receive/list" :icon="'shoukuan'"/>
          <IconLink :text="'应付帐单'" to="/owner/account/pay/list" :icon="'fukuan2'"/>
          <IconLink :text="'结算明细'" to="/owner/account/bill/list" :icon="'icon-font-'"/>
        </div>
      </template>
    </Box>
    <Box :title="'库存管理'" bd-borderness>
      <template slot="bd">
        <div class="list">
          <IconLink :text="'库存查询'" to="/owner/stock/waresearch" :icon="'kucunchaxun'"/>
          <IconLink :text="'台账查询'" to="/owner/stock/standing" :icon="'chaxun'"/>
          <IconLink :text="'库存调整'" to="/owner/stock/adjust/list" :icon="'pandian'"/>
          <IconLink :text="'仓库调拨'" to="/owner/stock/allot/list" :icon="'kucuntiaobo'"/>
        </div>
      </template>
    </Box>
    <Box :title="'报表查询'" bd-borderness>
      <template slot="bd">
        <div class="list">
          <IconLink :text="'进销存查询'" to="/owner/report/sale" :icon="'fuwu-jinxiaocunbaobiao'"/>
          <IconLink :text="'销售查询'" to="/owner/report/order" :icon="'icon_xiaoshoubaobiao'"/>
          <IconLink :text="'采购查询'" to="/owner/report/purchase" :icon="'caigoubaobiao'"/>
        </div>
      </template>
    </Box>
    <Box :title="'基础管理'" bd-borderness>
      <template slot="bd">
        <div class="list">
          <IconLink :text="'商品管理'" to="/owner/basics/product/list" :icon="'shangpin1-copy'"/>
          <IconLink :text="'商品分类'" to="/owner/basics/classify/list" :icon="'shangpinfenlei-'"/>
          <IconLink :text="'供应商信息'" to="/owner/basics/provider/list" :icon="'gongyingshang-copy'"/>
          <IconLink :text="'客户信息'" to="/owner/basics/customer/list" :icon="'kehu2'"/>
          <IconLink :text="'仓库信息'" to="/owner/basics/warehouse/list" :icon="'cangku'"/>
        </div>
      </template>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/share/Box'
import IconLink from '@/components/owner/workbench/IconLink'

export default {
  to: 'Workbench',
  layout: 'owner.tabbar',
  components: {
    Box,
    IconLink
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  padding: 20px 0;
}
</style>
