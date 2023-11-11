<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getActivePinia, storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import { useEventStore } from '@/stores/event'
import routerConfig from '@/plugins/router'

import TheCalendar from '@/components/dashboard/TheCalendar.vue'
import TheSidebarProfile from '@/components/dashboard/TheSidebarProfile.vue'
import TheSidebarHeaderUserInfo from '@/components/dashboard/TheSidebarHeaderUserInfo.vue'
import CardEventSidebar from '@/components/dashboard/card/CardEventSidebar.vue'
import CardEmpty from '@/components/dashboard/card/CardEmpty.vue'

const router = useRouter()
const authStore = useAuthStore()
const eventStore = useEventStore()

const { sidebarEvents } = storeToRefs(eventStore)

const isProfileSectionOpen = ref(false)
const noEventsToDisplay = computed(() => sidebarEvents.value.length === 0)

const toggleProfileSection = () => {
  isProfileSectionOpen.value = !isProfileSectionOpen.value
}

const logout = () => {
  authStore.logout()
  getActivePinia()._s.forEach((store) => store.$reset())
  router.push({ name: routerConfig.auth.login.name })
}
</script>

<template>
  <header class="sidebar-header">
    <div class="sidebar-header__notification" @click="logout">
      <BaseIcon icon-name="NotifBing" />
    </div>

    <TheSidebarHeaderUserInfo
      v-show="!isProfileSectionOpen"
      @click="toggleProfileSection"
      class="sidebar__header-user-info"
    />
    <div v-show="isProfileSectionOpen">
      <button @click="toggleProfileSection" class="sidebar__go-back">
        <BaseIcon icon-name="ArrowRight" />
      </button>
    </div>
  </header>

  <TheSidebarProfile v-if="isProfileSectionOpen" />
  <div v-show="!isProfileSectionOpen" class="sidebar-calendar"><TheCalendar /></div>
  <div v-show="!isProfileSectionOpen" class="sidebar-events">
    <h3 class="sidebar-events__heading">رویداد های امروز</h3>
    <div class="sidebar-events__cards">
      <div v-show="noEventsToDisplay" class="sidebar-events__empty-card">
        <CardEmpty theme="gray" />
      </div>

      <div class="sidebar-events__card" v-for="{ _id: id, data: event } in sidebarEvents" :key="id">
        <CardEventSidebar
          :id="id"
          :date="event.dueDate"
          :time="event.time"
          :title="event.title"
          :description="event.description"
          :users="event.users"
          :creator="'event.creator'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;
@use '@/assets/styles/sass/utils/mixins' as mixin;

.sidebar-header {
  @extend .center-flex-vertically;
  justify-content: space-between;
  height: 5rem;
  padding: 0;

  &__notification {
    @extend .center-flex-horizontally;
    width: 2rem;
    margin-top: 0.3rem;
  }
}

.sidebar-calendar {
  margin: 1.5rem 0 2.2rem 0;
}

.sidebar-events {
  &__heading {
    @include mixin.typographyPreset('headline-3');
    text-align: right;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  &__card {
    margin-bottom: 1.2rem;
  }

  &__empty-card {
    height: 8rem;
  }
}

.sidebar__go-back {
  border: none;
}
</style>
