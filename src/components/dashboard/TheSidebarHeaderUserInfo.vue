<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()

const userFullName = computed(() => {
  const firstName = authStore.user.firstName
  const lastName = authStore.user.lastName
  return `${firstName} ${lastName}`
})
</script>

<template>
  <div class="user-info">
    <div class="user-info__text">
      <p class="user-info__full-name">{{ userFullName }}</p>
      <p class="user-info__status">بدون رویداد</p>
    </div>
    <div class="user-info__profile-pic">
      <img
        src="../../assets/images/static-avatar-1.png"
        alt=""
        class="user-info__profile-pic-img"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.user-info {
  @extend .center-flex-vertically;
  display: flex;
  flex-direction: row;
  height: 100%;

  &__profile-pic {
    margin-top: 0.5rem;
    border-radius: 50%;
    height: 3.6rem;
    background: $color-gray-300;
  }

  &__text {
    margin-right: 0.5rem;
    text-align: right;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__full-name {
    @include mixin.typographyPreset('headline-5');
    margin: 12px 0 0 0;
  }
  &__status {
    @include mixin.typographyPreset('body-2');
    padding-right: 0.2rem;
    margin: 5px 0 0 0;
  }
}
</style>
