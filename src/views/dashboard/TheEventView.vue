<script setup>
import { computed, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import { useEventStore } from '@/stores/event'

import CardEvent from '@/components/dashboard/card/CardEvent.vue'
import BaseNoContent from '@/components/common/BaseNoContent.vue'
import TheLayoutDashboard from '@/layouts/TheLayoutDashboard.vue'

const eventStore = useEventStore()
const { filteredEvents } = storeToRefs(eventStore)

onBeforeMount(() => {
  eventStore.getEvents(localStorage.getItem('userId'))
})

const noContent = computed(() => filteredEvents.value.length === 0)
</script>

<template>
  <TheLayoutDashboard>
    <div class="event-view">
      <BaseNoContent v-show="noContent" label="رویداد" />
      <section class="event-view__cards-wrapper">
        <div
          class="event-view__card-container"
          v-for="{ _id: id, data: event } in filteredEvents"
          :key="id"
        >
          <CardEvent
            :id="id"
            :date="event.dueDate"
            :time="event.time"
            :title="event.title"
            :description="event.description"
            :users="event.users"
            :creator="'event.creator'"
          />
        </div>
      </section>
    </div>
  </TheLayoutDashboard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment' as *;

.event-view {
  &__cards-wrapper {
    @extend .center-flex-vertically;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 2rem;
  }

  &__card-container {
    max-height: 40rem;
    margin: 0 10px 10px 0;
  }
}
</style>
