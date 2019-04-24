export const state = () => ({
  list: [] // 供应商列表
})

export const mutations = {
  initList(state, payload = []) {
    state.list = payload
  },

  change(state, payload) {
    // TODO 修改
  },

  add(state, payload) {
    // TODO 新增
    state.list.push(payload)
  }
}

export const getters = {
  initialized(state) {
    return state.list.length > 0
  }
}
