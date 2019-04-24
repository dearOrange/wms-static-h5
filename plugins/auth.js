export default ({ store, route }, inject) => {
  inject('auth', {
    async login(data) {
      let rst = await store.dispatch('auth/login', data)
      return rst
    },
    logout() {
      // TODO
      console.log('注销')
    },
    redirect() {
      // 重定向
      // TODO 记录当前路由信息
      route.repace('/login')
    }
  })
}
