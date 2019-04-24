// import { sleep } from '@/utils'

const checkNeedAuth = (route, key, value) => {
  return route.matched.some(m => {
    if (process.browser) {
      // Browser
      return Object.values(m.components).some(
        component => component.options && component.options[key] === value
      )
    } else {
      // SSR
      return Object.values(m.components).some(component =>
        Object.values(component._Ctor).some(
          ctor => ctor.options && ctor.options[key] === value
        )
      )
    }
  })
}

export default async function(context) {
  let isPrevLogged = context.store.getters['auth/isLoggin']
  if (!checkNeedAuth(context.route, 'auth', false)) {
    if (!isPrevLogged) {
      let isLogged = await context.store.dispatch('auth/checkLogged')
      if (!isLogged) {
        context.store.commit('auth/addBefore', context.route)
        context.redirect('/login')
      }
    }
  }
}
