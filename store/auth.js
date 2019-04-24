import { loginByAccount, getLoginUser } from '@/api/auth'

export const state = () => ({
  before: null,
  user: null
})

export const mutations = {
  addUser(state, payload) {
    state.user = payload
  },
  addBefore(state, payload) {
    state.before = payload
  }
}

export const actions = {
  async login({ commit }, loginDate) {
    let { success: logged } = await loginByAccount(loginDate)
    return logged
  },

  async checkLogged({ commit }) {
    console.log('检测')
    let { success, data: user } = await getLoginUser()
    if (success) {
      commit('addUser', user)
    }
    return success
  }
}

export const getters = {
  isLoggin(state) {
    return !!state.user
  },
  before(state) {
    return state.before
  }
}
