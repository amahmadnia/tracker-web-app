<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

import { authService } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { validatorMessages } from '@/utils/constants'
import { displayToast } from '@/plugins/toastify'
import routerInfo from '@/plugins/router'
import { setCookie } from '@/plugins/cookies'

import TheLayoutAuth from '@/layouts/TheLayoutAuth.vue'

const router = useRouter()
const authStore = useAuthStore()

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .required(validatorMessages.email.required)
      .email(validatorMessages.email.format),
    password: yup.string().required(validatorMessages.password.required)
  })
})

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    const { token } = await authService.login({
      email,
      password
    })
    setCookie(token)

    // await authStore.setProfile()

    displayToast(validatorMessages.loginSuccessful)
    setTimeout(() => {
      router.push({ name: routerInfo.dashboard.home.name })
    }, 2000)
  } catch (err) {
    displayToast(validatorMessages.incorrectInputs, 'error')
  }
})
</script>

<template>
  <TheLayoutAuth>
    <form @submit="onSubmit" class="auth-form__form">
      <BaseInputText name="email" label="ایمیل" type="email" icon-name="User" />
      <BaseInputText name="password" label="رمزعبور" type="password" icon-name="Lock" />
      <BaseButton type="submit" :display-block="true" label="ورود" />
    </form>
    <div class="auth-form__link-box">
      حساب کاربری ندارید؟
      <RouterLink :to="{ name: 'signup' }" class="auth-form__link">ثبت نام</RouterLink>
    </div>
  </TheLayoutAuth>
</template>

<style scoped lang="scss"></style>
