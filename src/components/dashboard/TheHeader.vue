<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import routerConfig from '@/plugins/router'

import FilterActivities from '@/components/dashboard/filter/FilterActivities.vue'
import FilterEvents from '@/components/dashboard/filter/FilterEvents.vue'
import FilterEventsActiveFilters from '@/components/dashboard/filter/FilterEventsActiveFiltersUsers.vue'
import FilterEventsActiveFiltersDate from '@/components/dashboard/filter/FilterEventsActiveFiltersDate.vue'
import FilterActivitiesActiveFiltersDate from '@/components/dashboard/filter/FilterActivitiesActiveFiltersDate.vue'
import FilterActivitiesActiveFiltersActivityTypes from '@/components/dashboard/filter/FilterActivitiesActiveFiltersActivityTypes.vue'

const router = useRouter()

const routeName = computed(() => {
  const name = router.currentRoute.value.name
  const dashboardRoutes = routerConfig.dashboard
  return {
    home: name === dashboardRoutes.home.name,
    activity: name === dashboardRoutes.activity.name,
    event: name === dashboardRoutes.event.name
  }
})

const goToPreviousPage = () => {
  router.go(-1)
}
</script>

<template>
  <header class="header">
    <div class="header-section header-section--left" style="flex: 60%">
      <FilterActivities v-if="routeName.activity" />
      <FilterEvents v-else-if="routeName.event" />

      <FilterActivitiesActiveFiltersActivityTypes v-if="routeName.activity" />
      <FilterActivitiesActiveFiltersDate v-if="routeName.activity" />

      <FilterEventsActiveFilters v-if="routeName.event" />
      <FilterEventsActiveFiltersDate v-if="routeName.event" />
    </div>
    <div class="header-section header-section--right" style="flex: 35%">
      <h3 class="header__title-h3">{{ $route.meta.title }}</h3>
    </div>
    <div v-if="!routeName.home" class="header-section" style="flex: 3%">
      <button class="header__go-back-btn" @click="goToPreviousPage">
        <BaseIcon :is-active="true" icon-name="ArrowRight" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.header {
  height: 4rem;
  display: flex;
  flex: 0 7%;
  padding: 1rem 3.5rem;
  margin: 1.5rem 0 0.7rem 0;

  .header-section {
    @extend .center-flex-vertically;
    padding: 0.31rem;

    &--left {
      justify-content: left;
    }
    &--right {
      justify-content: right;
    }
  }
  &-go-back-btn &__title {
    &-h3 {
      @include mixin.typographyPreset('headline-5');
    }
  }

  &__go-back {
    &-btn {
      background-color: transparent;
      color: $color-light-base;
      border: none;
      border-radius: 50%;
      margin: 0.1rem 0 0 0;
      cursor: pointer;
      transition: background-color 0.3s;
      padding: 0.4rem 0 0 0;
    }

    &-btn:hover {
      background-color: $color-rgba-black-100;
    }
  }
}
</style>
