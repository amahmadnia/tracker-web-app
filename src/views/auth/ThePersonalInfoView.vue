<script setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { validatorMessages } from '@/utils/constants'
import { authService } from '@/services/auth'
import { displayToast } from '@/plugins/toastify'
import routerInfo from '@/plugins/router'

import TheLayoutAuth from '@/layouts/TheLayoutAuth.vue'
import BaseInputText from '@/components/common/BaseInputText.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.isSignupEmailEmpty) {
    router.push({ name: 'signup' })
  }
})

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    firstName: yup.string().required(validatorMessages.firstName),
    lastName: yup.string().required(validatorMessages.lastName),
    age: yup
      .number()
      .required('Please supply your age')
      .min(18, 'You must be at least 18 years')
      .max(60, 'You must be at most 60 years')
  })
})

const onSubmit = handleSubmit(async (values) => {
  try {
    await authService.signup({
      ...values,
      age: Number(values.age),
      email: authStore.signupFormData.email,
      password: authStore.signupFormData.password
    })
    displayToast(validatorMessages.signupSuccessful)
    setTimeout(() => {
      router.push({ name: routerInfo.auth.login.name })
    }, 2000)
  } catch (err) {
    displayToast(err.error.message.fa, 'error')
  }
})
</script>

<template>
  <TheLayoutAuth>
    <form @submit="onSubmit" class="auth-form__form">
      <BaseInputText name="firstName" label="نام" icon-name="User" />
      <BaseInputText name="lastName" label="نام خانوادگی" icon-name="User" />
      <BaseInputText name="age" label="سن" icon-name="Calendar" />
      <BaseButton type="submit" :display-block="true" label="تکمیل ثبت نام" />
    </form>
  </TheLayoutAuth>
</template>

<style scoped lang="scss"></style>
