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
  <section class="sidebar-profile">
    <div class="sidebar-big-profile-pic">
      <img src="../../assets/images/static-avatar-2.png" alt="" />
    </div>
    <h3 class="sidebar-profile__fullName">{{ userFullName }}</h3>
    <ul class="sidebar-profile__list">
      <li class="sidebar-profile__list-item">
        <div class="sidebar-profile__list-item-divider--left">
          <BaseIcon icon-name="ArrowLeftSmall" />
          sacremoni@italy.com
        </div>
        <div class="sidebar-profile__list-item-divider">
          ایمیل &nbsp;
          <BaseIcon icon-name="UserBold" />
        </div>
      </li>
      <li class="sidebar-profile__list-item">
        <div class="sidebar-profile__list-item-divider--left">
          <BaseIcon icon-name="ArrowLeftSmall" />
          ********
        </div>
        <div class="sidebar-profile__list-item-divider">
          رمز عبور &nbsp;
          <BaseIcon icon-name="LockBold" />
        </div>
      </li>
      <li class="sidebar-profile__list-item">
        <div class="sidebar-profile__list-item-divider--left">
          <BaseIcon icon-name="ArrowLeftSmall" />
          26
        </div>
        <div class="sidebar-profile__list-item-divider">
          سن &nbsp;
          <BaseIcon icon-name="CalendarBold" color="#25A244" />
        </div>
      </li>
      <li class="sidebar-profile__list-item">
        <div class="sidebar-profile__list-item-divider--left">
          <BaseIcon icon-name="ArrowLeftSmall" />
          sacremoni@italy.com
        </div>
        <div class="sidebar-profile__list-item-divider">
          اشتراک &nbsp;
          <BaseIcon icon-name="ArownBold" />
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.sidebar-profile {
  @extend .center-flex-horizontally;
  flex-direction: column;
  margin: 7rem 0 0 0;

  &__fullName {
    text-align: center;
  }

  &__list {
    padding: 2rem;
    @extend .center-flex;
    flex-direction: column;

    &-item {
      @extend .center-flex-vertically;
      justify-content: space-between;
      margin: 0 0 1rem 0;
      width: 100%;
      padding: 1rem 0;
      border-bottom: 1px solid $color-rgba-black-100;
      transition: background-color 0.2s ease;
      @include mixin.typographyPreset('subtitle-1');

      &:hover {
        background: $color-rgba-black-100;
      }

      &-divider {
        @extend .center-flex-vertically;
        justify-content: space-between;

        &--left {
          @extend .sidebar-profile__list-item-divider;
          color: $color-text-base-1;
        }
      }
    }
  }
}

.sidebar-big-profile-pic {
  width: 9rem;
  height: 9rem;
  margin: 2rem auto;
  background: $color-gray-300;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
