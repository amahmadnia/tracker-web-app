<script setup>
import { computed } from 'vue'

import { filterTypes } from '@/utils/filterData'
import { convertAndFormatToJalaliDate } from '@/utils/dateJalali'

import { useActivityStore } from '@/stores/activity'
import TagRemoveFilter from '@/components/dashboard/tag/TagRemoveFilter.vue'

const activityStore = useActivityStore()

const removeFilter = (type, id = '') => {
  if (type === filterTypes.array) activityStore.removeFilterItemOfArray(filterTypes.array, id)
  else if (type === filterTypes.dateRange) activityStore.removeFilterDate()
}

const activeFilterDateRange = computed(() => {
  const filter = activityStore.filters.find((filter) => filter.type === filterTypes.dateRange)
  return !filter ? { start: null, end: null } : filter.filterState.value
})
const activeFilterDateRangeTagLabel = computed(() => {
  return `${convertAndFormatToJalaliDate(
    activeFilterDateRange.value.start
  )} تا ${convertAndFormatToJalaliDate(activeFilterDateRange.value.end)}`
})
</script>

<template>
  <div
    class="activities-active-filters"
    v-if="activeFilterDateRange.start && activeFilterDateRange.end"
  >
    <TagRemoveFilter
      :filter-items="activeFilterDateRangeTagLabel"
      @click="removeFilter(filterTypes.dateRange)"
    />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/sass/abstracts' as *;
@use '@/assets/styles/sass/utils/alignment' as *;

.activities-active-filters {
  @extend .center-flex-vertically;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
