<script setup>
import { computed, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import { useActivityStore } from '@/stores/activity'

import TheLayoutDashboard from '@/layouts/TheLayoutDashboard.vue'
import CardActivity from '@/components/dashboard/card/CardActivity.vue'
import BaseNoContent from '@/components/common/BaseNoContent.vue'
import { useActivityTypeStore } from '@/stores/activityType'

const activityStore = useActivityStore()
const activityTypeStore = useActivityTypeStore()
const { filteredActivities } = storeToRefs(activityStore)

onBeforeMount(async () => {
  const userId = localStorage.getItem('userId')

  await activityStore.getActivities(userId)
  await activityTypeStore.getActivityTypes(userId)
})

const noContent = computed(() => filteredActivities.value.length === 0)
</script>

<template>
  <TheLayoutDashboard>
    <BaseNoContent v-show="noContent" label="فعالیت" />
    <div class="activity-view">
      <section class="cards-wrapper">
        <div
          class="activity-card-container"
          v-for="{ data: activity, _id } in filteredActivities"
          :key="_id"
        >
          <CardActivity
            :id="_id"
            :date="activity.date"
            :time-range="`${activity.endTime} تا ${activity.startTime}`"
            :title="activity.title"
            :description="activity.description"
            :activity-type="activity.activityType"
          />
        </div>
      </section>
    </div>
  </TheLayoutDashboard>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/utils/alignment' as *;

.cards-wrapper {
  @extend .center-flex-vertically;
  justify-content: flex-end;

  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
}

.activity-card-container {
  width: 15rem;
  max-height: 40rem;
  margin: 0 10px 10px 0;
}
</style>
