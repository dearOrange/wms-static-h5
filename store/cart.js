import { findIndex, cloneDeep, reduce } from 'lodash'

export const state = () => ({
  carts: [] // 购物车数据
})

export const mutations = {
  clear(state) {
    state.carts = []
  },
  update(state, payload) {
    let { id, count, data } = payload
    let foundIndex = findIndex(state.carts, item => item.id === id)
    if (foundIndex === -1) {
      state.carts = [
        ...state.carts,
        {
          id,
          data,
          count
        }
      ]
    } else {
      state.carts.splice(
        foundIndex,
        1,
        Object.assign(cloneDeep(state.carts[foundIndex]), {
          count
        })
      )
      state.carts = [...state.carts]
    }
  }
}

export const getters = {
  count({ carts }) {
    return reduce(
      carts,
      (acc, item) => {
        return acc + item.count
      },
      0
    )
  },
  list({ carts }) {
    return carts
  },

  goodsList({ carts }) {
    return carts.map(item => {
      return {
        ...item.data,
        count: item.count
      }
    })
  }
}
