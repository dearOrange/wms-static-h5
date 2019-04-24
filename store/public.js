// import { find } from 'lodash'
import { cloneDeep, findIndex } from 'lodash'

export const state = () => ({
  provider: null, // 供应商信息
  depot: null, // 仓库信息
  goods: [], // 商品信息
  receiver: null, // 收货人信息
  owner: null, // 货主信息
  customer: null // 客户信息
})

export const mutations = {
  /**
   * * 添加已选供应商
   * @param {Object} payload 供应商项
   */
  setProvider(state, payload) {
    state.provider = payload
  },
  delProvider(state) {
    state.provider = null
  },
  /**
   * * 添加已选客户
   * @param {Object} payload 客户项
   */
  setCustomer(state, payload) {
    state.customer = payload
  },
  delCustomer(state) {
    state.customer = null
  },

  /**
   * * 添加已选货主
   * @param {Object} payload 货主项
   */
  setOwner(state, payload) {
    state.owner = payload
  },
  delOwner(state) {
    state.owner = null
  },

  /**
   * * 添加已选仓库
   * @param {Object} payload 仓库项
   */
  setDepot(state, payload) {
    state.depot = payload
  },
  delDepot(state) {
    state.depot = null
  },

  /**
   * * 新增某条已选商品
   * @param {Object} payload 商品项
   */
  setGoods(state, payload = []) {
    state.goods = [...payload]
  },
  /**
   * * 删除所有已选商品
   * @param {Object} payload 商品项
   * @param {String} payload.id 唯一标识符
   */
  delGoods(state, payload) {
    state.goods = []
  },
  delOneGoods(state, { productItemUkid }) {
    let foundIndex = findIndex(state.goods, item => {
      return item.productItemUkid === productItemUkid
    })
    if (foundIndex !== -1) {
      state.goods.splice(foundIndex, 1)
      state.goods = [...state.goods]
    }
  },

  updateGoodsCount(state, { productItemUkid, count }) {
    let foundIndex = findIndex(state.goods, item => {
      return item.productItemUkid === productItemUkid
    })
    if (foundIndex !== -1) {
      state.goods.splice(
        foundIndex,
        1,
        Object.assign(cloneDeep(state.goods[foundIndex]), {
          count
        })
      )
      state.goods = [...state.goods]
    }
  },

  /**
   * * 新增收货信息
   * @param {Object} payload 收货信息
   * @param {String} payload.name
   * @param {String} payload.phone
   * @param {Array} payload.district
   * @param {String} payload.address
   */
  setReceiver(state, payload) {
    state.receiver = payload ? { ...payload } : null
  },
  delReceiver(state) {
    state.receiver = null
  }
}

export const getters = {
  provider({ provider }) {
    return provider
  },
  depot({ depot }) {
    return depot
  },
  goods({ goods }) {
    return goods
  },
  receiver({ receiver }) {
    return receiver
  },
  customer({ customer }) {
    return customer
  },
  owner({ owner }) {
    return owner
  }
}

export const actions = {
  clearAll({ commit }) {
    commit('delProvider')
    commit('delDepot')
    commit('delGoods')
    commit('delReceiver')
    commit('delCustomer')
  }
}
