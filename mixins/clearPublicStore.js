import { mapActions } from 'vuex'
import { startsWith } from 'lodash'

export default function clearPublicStore(type) {
  return {
    methods: {
      ...mapActions({
        clearPublicAll: 'public/clearAll'
      })
    },

    beforeRouteLeave(to, from, next) {
      let path = to.fullPath
      if (!startsWith(path, '/public')) {
        this.clearPublicAll()
      }
      next()
    }
  }
}
