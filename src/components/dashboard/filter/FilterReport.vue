<script setup>
import { computed, ref } from 'vue'

import { useActivityStore } from '@/stores/activity'

const activityStore = useActivityStore()

const activeFilter = ref('all')

const tags = computed(() => {
  return [
    {
      label: 'روزانه',
      interval: 'daily',
      isActive: activeFilter.value === 'daily'
    },
    {
      label: 'هفتگی',
      interval: 'weekly',
      isActive: activeFilter.value === 'weekly'
    },
    {
      label: 'ماهانه',
      interval: 'monthly',
      isActive: activeFilter.value === 'monthly'
    },
    {
      label: 'سالانه',
      interval: 'yearly',
      isActive: activeFilter.value === 'yearly'
    },
    {
      label: 'همه',
      interval: 'all',
      isActive: activeFilter.value === 'all'
    }
  ]
})

const applyFilter = (interval) => {
  activeFilter.value = interval
  activityStore.getReports(activeFilter.value)
}

const isActive = (interval) => {
  return activeFilter.value === interval
}
</script>

<template>
  <div class="filter-tags">
    <BaseTag
      v-for="tag in tags"
      :label="tag.label"
      :is-active="isActive(tag.interval)"
      :key="tag.interval"
      @click="applyFilter(tag.interval)"
    />
  </div>
</template>

<style scoped lang="scss">
.filter-tags {
  margin-top: 0.3rem;
}
</style>
