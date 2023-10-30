// import Vue from 'vue'
// import { VSnackbar, VIcon } from 'vuetify/lib'
import { provide, inject } from 'vue'

export function leadingSlash(str: string) {
  return str.startsWith('/') ? str : '/' + str
}

export function trailingSlash(str: string) {
  return str.endsWith('/') ? str : str + '/'
}

export const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((cipher) => '%' + ('00' + cipher.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload)
}

export const createContext = <T>(ctx: T) => {
  const storeKey = crypto.randomUUID()
  return [() => provide(storeKey, ctx), () => inject<T>(storeKey)] as const
}

class Alert {
  _vms = []

  destroy() {
    /**
    for (const _vm of this._vms) {
      _vm && _vm.$destroy()
    }
    */
  }

  open(message: string, type = 'info') {
    this.destroy()
    /** vue2 ... */
    /*
    const vm = new Vue({
      components: {
        'v-icon': VIcon,
        'v-snackbar': VSnackbar
      },
      render: h => h('v-snackbar', {
        props: {
          value: true,
          top: true,
          color: type
        },
        on: {
          input: ($event) => { this.value = $event }
        }
      }, [h('strong', message)]),
      beforeUnmount() {
        document.body.querySelector('.v-application').removeChild(vm.$el)
      }
    }).$mount()
    this._vms.push(vm)
    document.body.querySelector('.v-application').appendChild(vm.$el)
    */
  }
}
export const alert = new Alert()
