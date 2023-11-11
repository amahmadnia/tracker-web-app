<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { validatorMessages } from '@/utils/constants'
import routerConfig from '@/plugins/router'
import TheLayoutAuth from '@/layouts/TheLayoutAuth.vue'
import BaseInputText from '@/components/common/BaseInputText.vue'

const router = useRouter()
const authStore = useAuthStore()

const getCharacterValidationError = (str) => {
  return ` رمز عبور دارای حداقل 1 کاراکتر ${str} باشد `
}

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .required(validatorMessages.email.required)
      .email(validatorMessages.email.format),
    password: yup
      .string()
      .required(validatorMessages.password.required)
      .min(8, 'رمز عبور خداقل 8 کاراکتر باشد')
      .matches(/[0-9]/, getCharacterValidationError('عدد'))
      .matches(/[a-z]/, getCharacterValidationError('کوچک'))
      .matches(/[A-Z]/, getCharacterValidationError('بزرگ'))
  })
})

const onSubmit = handleSubmit(({ email, password }) => {
  authStore.setSignupFormValues({
    email,
    password
  })
  router.push({ name: routerConfig.auth.personalInfo.name })
})
</script>

<template>
  <TheLayoutAuth>
    <form @submit="onSubmit" class="auth-form__form">
      <BaseInputText name="email" label="ایمیل" type="email" icon-name="User" />
      <BaseInputText name="password" label="رمزعبور" type="password" icon-name="Lock" />
      <BaseButton type="submit" :display-block="true" label="ثبت نام" />
    </form>
  </TheLayoutAuth>
</template>

<style scoped lang="scss"></style>
