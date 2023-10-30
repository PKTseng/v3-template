<template>
  <v-app>
    <v-overlay :value="isLoading" z-index="999">
      <v-progress-circular :size="50" color="primary" indeterminate />
    </v-overlay>
    <v-form>
      <div class="wrap" :style="{ backgroundImage: `url(${bg})` }">
        <div class="glass">
          <v-toolbar-title class="mb-5 glass__title">{{ SYS_NAME }}</v-toolbar-title>
          <!-- account -->
          <v-text-field
            v-model.trim="email"
            dark
            prepend-icon="mdi-account"
            name="Email"
            label="信箱"
            type="text"
            autocomplete="off"
            @focus="errMsg = ''"
          />

          <!-- password -->
          <v-text-field
            id="mdi-password"
            v-model.trim="secret"
            dark
            prepend-icon="mdi-lock"
            name="Secret"
            label="密碼"
            autocomplete="off"
            :append-icon="passwordStatus ? 'mdi-eye-off' : 'mdi-eye'"
            :type="passwordStatus ? 'password' : 'text'"
            @click:append="passwordStatus = !passwordStatus"
            @focus="errMsg = ''"
            @keyup.enter="login"
          />

          <!-- captcha -->
          <div>
            <template v-if="loadingChangeCaptchaImg">
              <v-skeleton-loader style="width: 100%; height: 60px" type="image" />
            </template>
            <template v-else>
              <img style="width: 100%; height: 60px" :src="captchaImgBase64Src" alt="captcha" />
            </template>
            <v-text-field
              v-model.trim="uppercaseInput"
              dark
              name="captcha"
              label="請輸入驗證碼"
              type="text"
              hide-details
              append-outer-icon="mdi-refresh"
              @hook:mounted="onChangeCaptcha"
              @keyup.enter="onLogin"
              @click:append-outer="onChangeCaptcha"
            />
          </div>

          <p v-if="errMsg" style="text-align: center; color: var(--v-error-lighten1)">
            {{ errMsg }}
          </p>

          <div class="d-flex justify-center">
            <v-btn color="primary" @click="onLogin">登入</v-btn>
          </div>

          <v-btn
            :disabled="loading"
            class="mt-3 font-weight-black"
            color="white"
            plain
            x-large
            @click="handleForgetPassword"
          >
            忘記密碼?
          </v-btn>
          <v-btn
            :disabled="loading"
            class="mt-3 font-weight-black"
            color="white"
            plain
            x-large
            @click="handleTestToken"
          >
            test {{ testToken }}
          </v-btn>
          <v-btn
            :disabled="loading"
            class="mt-3 font-weight-black"
            color="white"
            plain
            x-large
            @click="handlerRmToken"
          >
            test {{ testToken }}
          </v-btn>
        </div>
      </div>
    </v-form>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import bg from '@/assets/bg.png'
import { useAuth } from '@/hooks/auth/useAuth'
import { useLocalStorage, useLocalStorageWithDefault } from '@/hooks/useLocalStorage'

const SYS_NAME = import.meta.env.VITE_APP_TITLE
const email = ref('')
const secret = ref('')
const errMsg = ref('')
const loading = ref(false)
const passwordStatus = ref(true)

const loadingChangeCaptchaImg = ref(false)
const captcha = ref('')

const uppercaseInput = computed({
  get: () => captcha.value,
  set: (newValue) => {
    captcha.value = newValue.toUpperCase()
  }
})

// const disAllowLogin = computed(() => !email.value || !secret.value || !captcha.value)

const { isLoading, login, captchaImgBase64Src, refreshCaptchaBase64: onChangeCaptcha } = useAuth()

const onLogin = async () => {
  // validations ....
  await login({ email: email.value, secret: secret.value, captcha: captcha.value })
}

const handleForgetPassword = () => {
  //noop
}

const [testToken, setTestToken, rmToken] = useLocalStorageWithDefault<string>('test', '1222')
// const [testToken, setTestToken, rmToken] = useLocalStorage<string>('test')

const handleTestToken = () => {
  setTestToken('5555')
}

const handlerRmToken = () => {
  rmToken()
}

// onMounted(() => {
//   console.log('testToken.value', testToken.value)
// })
</script>

<style lang="scss" scoped>
.wrap {
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}

.glass {
  width: 320px;

  @media screen and (min-width: 425px) {
    width: 360px;
  }

  @media screen and (min-width: 768px) {
    width: 400px;
  }

  background-color: rgba(white, 0.25);
  backdrop-filter: blur(5px);
  padding: 3rem 2rem;
  border: 2px solid var(--v-text-accent-base);
  color: var(--v-text-accent-base);
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    text-align: center;
  }
}
</style>
