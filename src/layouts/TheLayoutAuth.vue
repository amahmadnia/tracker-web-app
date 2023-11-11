<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import routerConfig from '@/plugins/router'

import IconArrowRight from '@/components/common/icons/IconArrowRight.vue'

const router = useRouter()

const formTitle = computed(() => router.currentRoute.value.meta.title)

const goToPreviousView = () => {
  router.currentRoute.value.name === 'personalInfo'
    ? router.push({ name: routerConfig.auth.signup.name })
    : router.push({ name: routerConfig.auth.login.name })
}
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <button
        v-if="$route.name !== 'login'"
        @click="goToPreviousView"
        class="auth-container__back-button"
      >
        <IconArrowRight />
      </button>
      <div class="auth-form">
        <div class="auth-form__banner">
          <img
            src="@/assets/images/auth-form-banner.png"
            alt="Form Header Image"
            class="auth-form__banner-img"
          />
        </div>
        <h2 class="auth-form__title">
          {{ formTitle }}
        </h2>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
