<script setup>
import { computed } from 'vue'

import routerConfig from '@/plugins/router'

import TheNavbarActionButton from '@/components/dashboard/TheNavbarActionButton.vue'

const routesPath = computed(() => {
  const dashboardRoutes = routerConfig.dashboard
  return {
    home: dashboardRoutes.home.path,
    activity: dashboardRoutes.activity.path,
    event: dashboardRoutes.event.path
  }
})
</script>

<template>
  <nav class="navbar">
    <div class="navbar__menu-wrapper">
      <ul class="navbar__menu">
        <RouterLink :to="routesPath.home">
          <li class="navbar__menu-item">
            <BaseIcon :is-active="$route.name === 'home'" icon-name="HomeBold" />
          </li>
        </RouterLink>
        <RouterLink :to="routesPath.event">
          <li class="navbar__menu-item">
            <BaseIcon :is-active="$route.name === 'events'" icon-name="Flash" />
          </li>
        </RouterLink>
        <RouterLink :to="routesPath.activity">
          <li class="navbar__menu-item">
            <BaseIcon :is-active="$route.name === 'activities'" icon-name="Note" />
          </li>
        </RouterLink>
      </ul>
    </div>
    <div class="navbar__floating-button-container">
      <TheNavbarActionButton />
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.navbar {
  &__menu-wrapper {
    text-align: center;
    flex: 70% 0;
  }

  &__menu {
    @extend .center-flex-vertically;
    height: 100%;
    text-align: center;
    padding: 2rem 0 0 0;
    list-style: none;
    flex-direction: column;
  }

  &__menu-item {
    @extend .center-flex-horizontally;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 3rem;
    text-align: center;
    padding: 0.625rem;
    margin: 0 0 1rem 0;
    border-radius: 50%;
  }

  &__menu-icon {
    margin: 0 auto;
    display: block;
  }

  &__menu-item:hover {
    background-color: $color-rgba-black-100;
  }

  &__floating-button-container {
    @extend .center-flex-horizontally;
    flex: 0 30%;
  }
}
</style>
