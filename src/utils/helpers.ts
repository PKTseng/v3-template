// import Vue from 'vue'
// import { VSnackbar, VIcon } from 'vuetify/lib'

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

export async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message) // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  return hashHex
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
