<script setup>
import { computed } from 'vue'

import { useEventStore } from '@/stores/event'
import { filterTypes } from '@/utils/filterData'

import TagRemoveFilter from '@/components/dashboard/tag/TagRemoveFilter.vue'
import { convertAndFormatToJalaliDate } from '@/utils/dateJalali'

const eventStore = useEventStore()

const removeFilter = (type, id = '') => {
  if (type === filterTypes.arrayMultiple)
    eventStore.removeFilterItemOfArrayMultiple(filterTypes.array, id)
  else if (type === filterTypes.dateRange) eventStore.removeFilterDate()
}

const activeFilterDateRange = computed(() => {
  const filter = eventStore.filters.find((filter) => filter.type === filterTypes.dateRange)
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
    class="events-active-filters"
    v-show="activeFilterDateRange.start && activeFilterDateRange.end"
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

.events-active-filters {
  @extend .center-flex-vertically;
  justify-content: flex-end;
  flex-wrap: wrap;
}
</style>
