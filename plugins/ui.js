import Vue from 'vue'

import MintUI, { InfiniteScroll } from 'mint-ui'
import 'mint-ui/lib/style.css'

// import VueDistrictPicker from 'vue-district-picker'
// import 'vue-district-picker/dist/vue-district-picker.css'

import Whitespace from '@/components/share/Whitespace'
import Header from '@/components/share/Header'
import Cell from '@/components/share/Cell'
import Field from '@/components/share/Field'
import Radio from '@/components/share/radio/index'
import Loading from '@/components/share/Loading'
import Collapse from '@/components/share/Collapse'
import NumCount from '@/components/share/NumCount'
import District from '@/components/share/District'
import DrawerLayout from '@/components/share/DrawerLayout'
import GoodsPreview from '@/components/share/GoodsPreview'

// Vue.use(VueDistrictPicker)
Vue.use(MintUI)
Vue.use(InfiniteScroll)
// Vue.use({
//   install: function(vm) {
//     vm.prototype.$toast = Toast
//   }
// })

Vue.component(Whitespace.name, Whitespace)
Vue.component(Header.name, Header)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Radio.name, Radio)
Vue.component(Loading.name, Loading)
Vue.component(Collapse.name, Collapse)
Vue.component(NumCount.name, NumCount)
Vue.component(District.name, District)
Vue.component(DrawerLayout.name, DrawerLayout)
Vue.component(GoodsPreview.name, GoodsPreview)
